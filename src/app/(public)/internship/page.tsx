'use client';
import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ChevronRight,
  Bookmark,
  Share2,
  CheckCircle2,
  Building2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/stores/auth.store';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { CAREER_OPPORTUNITIES, type Opportunity } from '@/data/career-opportunities';

const INTERNSHIPS = CAREER_OPPORTUNITIES.filter(opp => opp.category === 'internship');

export default function InternshipPage() {
  const { isAuthenticated } = useAuthStore();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const uniqueCompanies = Array.from(new Set(INTERNSHIPS.map(opp => opp.company))).sort();
  const uniqueLocations = Array.from(new Set(INTERNSHIPS.map(opp => opp.location))).sort();

  const filteredOpportunities = INTERNSHIPS.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.about.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(opp.company);
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(opp.location);

    return matchesSearch && matchesCompany && matchesLocation;
  });

  const toggleCompanyFilter = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
  };

  const toggleLocationFilter = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSelectedCompanies([]);
    setSelectedLocations([]);
    setSearchQuery('');
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    console.log('Applying to internship:', selectedOpportunity?.title);
  };

  return (
    <div className="min-h-screen bg-surface">
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login to Apply"
        description="Please login to your account to apply for internship opportunities."
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-on-surface mb-4">
            Explore <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Internship</span> Opportunities
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Gain hands-on experience with India's leading food and beverage companies. Develop practical skills, build industry connections, and launch your career.
          </p>
        </header>

        <section className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search by role, company, or skills"
                className="w-full bg-surface-container-low border-2 border-surface-container-high rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-0 focus:border-primary text-on-surface placeholder-on-surface-variant transition-all shadow-sm hover:border-outline"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-6 py-4 bg-surface-container-high text-on-surface border border-outline rounded-2xl hover:bg-surface-container-highest transition-all font-bold relative"
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedCompanies.length > 0 || selectedLocations.length > 0) && (
                <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedCompanies.length + selectedLocations.length}
                </span>
              )}
            </button>
          </div>
        </section>

        <div className="space-y-8">
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-surface-container-highest mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-on-surface mb-2">No internships found</h3>
              <p className="text-on-surface-variant">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opp) => (
                <motion.div
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  whileHover={{ y: -4 }}
                  className="bg-surface-container-lowest p-6 rounded-2xl border border-outline hover:border-primary cursor-pointer group flex flex-col transition-all shadow-sm hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-xs font-bold uppercase tracking-wider">
                        {opp.type}
                      </span>
                      <span className="block text-xs text-on-surface-variant font-medium">{opp.mode}</span>
                    </div>
                    <Bookmark className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{opp.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-2">{opp.company}</p>

                  <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-6">
                    <MapPin className="w-4 h-4" />
                    {opp.location}
                  </div>

                  <div className="mt-auto space-y-4 border-t border-outline pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-on-surface">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">{opp.timings}</span>
                      </div>
                      <span className="text-primary font-bold text-sm">{opp.stipend}</span>
                    </div>
                    <button className="w-full text-primary font-bold text-xs flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-3xl w-full max-w-2xl max-h-[80vh] border border-outline shadow-2xl flex flex-col"
            >
              <div className="bg-surface-container-low border-b border-outline px-8 py-6 flex justify-between items-start sticky top-0 z-10 rounded-t-3xl">
                <div>
                  <h2 className="text-3xl font-bold text-on-surface">Filters</h2>
                  <p className="text-on-surface-variant text-sm mt-2">Refine your search</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilterModal(false)}
                  className="p-2 hover:bg-surface-container-high rounded-lg transition-colors flex-shrink-0 ml-4"
                >
                  <X className="w-6 h-6 text-on-surface" />
                </motion.button>
              </div>

              <div className="overflow-y-auto flex-1 px-8 py-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">Company</h3>
                    <div className="space-y-2 border-l-2 border-primary/40 pl-5 ml-0">
                      {uniqueCompanies.map(company => (
                        <label key={company} className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-surface-container-low transition-colors -ml-3">
                          <input
                            type="checkbox"
                            checked={selectedCompanies.includes(company)}
                            onChange={() => toggleCompanyFilter(company)}
                            className="w-5 h-5 rounded border-2 border-outline bg-surface-container-low cursor-pointer accent-primary flex-shrink-0"
                          />
                          <span className="text-on-surface group-hover:text-primary transition-colors font-medium flex-1 text-base">{company}</span>
                          <span className="text-on-surface-variant text-xs bg-surface-container-high px-3 py-1 rounded-lg font-bold flex-shrink-0">
                            {INTERNSHIPS.filter(o => o.company === company).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-outline/50"></div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">Location</h3>
                    <div className="space-y-2 border-l-2 border-primary/40 pl-5 ml-0">
                      {uniqueLocations.map(location => (
                        <label key={location} className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-surface-container-low transition-colors -ml-3">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() => toggleLocationFilter(location)}
                            className="w-5 h-5 rounded border-2 border-outline bg-surface-container-low cursor-pointer accent-primary flex-shrink-0"
                          />
                          <span className="text-on-surface group-hover:text-primary transition-colors font-medium flex-1 text-base">{location}</span>
                          <span className="text-on-surface-variant text-xs bg-surface-container-high px-3 py-1 rounded-lg font-bold flex-shrink-0">
                            {INTERNSHIPS.filter(o => o.location === location).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-outline px-8 py-6 space-y-3 bg-surface-container-lowest sticky bottom-0 z-10 rounded-b-3xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilterModal(false)}
                  className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold transition-all hover:shadow-lg text-base"
                >
                  Apply Filters
                </motion.button>
                {(selectedCompanies.length > 0 || selectedLocations.length > 0) && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="w-full py-4 border-2 border-outline text-on-surface rounded-2xl font-bold hover:bg-surface-container-high transition-all text-base"
                  >
                    Clear All Filters
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opportunity Detail Modal */}
      <AnimatePresence>
        {selectedOpportunity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOpportunity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-3xl max-w-2xl w-full max-h-[90vh] border border-outline shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-surface-container-low border-b border-outline px-6 md:px-8 py-6 flex justify-between items-start gap-4 rounded-t-3xl z-10">
                <div>
                  <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                    {selectedOpportunity.type}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface">{selectedOpportunity.title}</h2>
                  <p className="text-on-surface-variant mt-2">{selectedOpportunity.company}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOpportunity(null)}
                  className="p-2 hover:bg-surface-container-high rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6 text-on-surface" />
                </motion.button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline">
                    <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      Location
                    </div>
                    <p className="text-on-surface font-bold">{selectedOpportunity.location}</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline">
                    <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      Timings
                    </div>
                    <p className="text-on-surface font-bold">{selectedOpportunity.timings}</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline">
                    <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Stipend
                    </div>
                    <p className="text-on-surface font-bold">{selectedOpportunity.stipend}</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline">
                    <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-1">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Mode
                    </div>
                    <p className="text-on-surface font-bold">{selectedOpportunity.mode}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Overview</h3>
                  <p className="text-on-surface-variant">{selectedOpportunity.description}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">What You'll Do</h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.about.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.qualification.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Perks & Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.perks.map(perk => (
                      <span key={perk} className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-outline bg-surface-container-lowest px-6 md:px-8 py-6 space-y-3 sticky bottom-0 z-10 rounded-b-3xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold transition-all hover:shadow-lg"
                >
                  Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border border-outline rounded-2xl hover:bg-surface-container-low transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5 text-on-surface" />
                  <span className="text-on-surface font-bold">Share</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
