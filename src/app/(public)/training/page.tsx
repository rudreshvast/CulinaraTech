'use client';
import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  Bookmark,
  Share2,
  CheckCircle2,
  X,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/stores/auth.store';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { CAREER_OPPORTUNITIES, type Opportunity } from '@/data/career-opportunities';

const TRAININGS = CAREER_OPPORTUNITIES.filter(opp => opp.category === 'training');

export default function TrainingPage() {
  const { isAuthenticated } = useAuthStore();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const uniqueTypes = Array.from(new Set(TRAININGS.map(opp => opp.type))).sort();
  const uniqueLocations = Array.from(new Set(TRAININGS.map(opp => opp.location))).sort();

  const filteredOpportunities = TRAININGS.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.about.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(opp.type);
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(opp.location);

    return matchesSearch && matchesType && matchesLocation;
  });

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleLocationFilter = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSearchQuery('');
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    console.log('Registering for:', selectedOpportunity?.title);
  };

  const getTypeColor = (type: string) => {
    return type === 'Workshop' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login to Register"
        description="Please login to your account to register for training programs and industrial visits."
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Enhance Your <span className="text-gradient-primary">Skills</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Participate in expert-led workshops and industrial visits. Learn from industry professionals and gain practical knowledge directly from leading food and beverage companies.
          </p>
        </header>

        <section className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search by title, company, or topic"
                className="w-full bg-card border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all shadow-sm hover:border-border/80"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-6 py-4 bg-muted text-foreground border border-border rounded-2xl hover:bg-muted/80 transition-all font-bold relative"
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedTypes.length > 0 || selectedLocations.length > 0) && (
                <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedTypes.length + selectedLocations.length}
                </span>
              )}
            </button>
          </div>
        </section>

        <div className="space-y-8">
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No training found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opp) => (
                <motion.div
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  whileHover={{ y: -4 }}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-primary cursor-pointer group flex flex-col transition-all shadow-sm hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${getTypeColor(opp.type)}`}>
                        {opp.type}
                      </span>
                      
                        <div className="mt-1 ml-3 text-xs text-muted-foreground font-medium">
                          {new Date(opp?.startDate ?? new Date()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - {new Date(opp?.endDate ?? new Date()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                    <Bookmark className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{opp.title}</h3>
                  <p className="mt-auto text-sm text-muted-foreground mb-3">{opp.company}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <MapPin className="w-4 h-4" />
                    {opp.location}
                  </div>

                  <div className="space-y-4 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">{opp.timings}</span>
                      </div>
                      <span className="text-primary font-bold text-sm">{opp.stipend === 'Free' ? 'Free' : opp.stipend}</span>
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
              className="bg-background rounded-3xl w-full max-w-2xl max-h-[80vh] border border-border shadow-2xl flex flex-col"
            >
              <div className="bg-card border-b border-border px-8 py-6 flex justify-between items-start sticky top-0 z-10 rounded-t-3xl">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Filters</h2>
                  <p className="text-muted-foreground text-sm mt-2">Refine your search</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilterModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0 ml-4"
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.button>
              </div>

              <div className="overflow-y-auto flex-1 px-8 py-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Type</h3>
                    <div className="space-y-2 border-l-2 border-primary/40 pl-5 ml-0">
                      {uniqueTypes.map(type => (
                        <label key={type} className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-muted transition-colors -ml-3">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleTypeFilter(type)}
                            className="w-5 h-5 rounded border-2 border-border bg-card cursor-pointer accent-primary flex-shrink-0"
                          />
                          <span className="text-foreground group-hover:text-primary transition-colors font-medium flex-1 text-base">{type}</span>
                          <span className="text-muted-foreground text-xs bg-muted px-3 py-1 rounded-lg font-bold flex-shrink-0">
                            {TRAININGS.filter(o => o.type === type).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border/50"></div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Location</h3>
                    <div className="space-y-2 border-l-2 border-primary/40 pl-5 ml-0">
                      {uniqueLocations.map(location => (
                        <label key={location} className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-muted transition-colors -ml-3">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() => toggleLocationFilter(location)}
                            className="w-5 h-5 rounded border-2 border-border bg-card cursor-pointer accent-primary flex-shrink-0"
                          />
                          <span className="text-foreground group-hover:text-primary transition-colors font-medium flex-1 text-base">{location}</span>
                          <span className="text-muted-foreground text-xs bg-muted px-3 py-1 rounded-lg font-bold flex-shrink-0">
                            {TRAININGS.filter(o => o.location === location).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border px-8 py-6 space-y-3 bg-card sticky bottom-0 z-10 rounded-b-3xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilterModal(false)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold transition-all hover:shadow-lg text-base"
                >
                  Apply Filters
                </motion.button>
                {(selectedTypes.length > 0 || selectedLocations.length > 0) && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="w-full py-4 border-2 border-border text-foreground rounded-2xl font-bold hover:bg-muted transition-all text-base"
                  >
                    Clear All Filters
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
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
              className="bg-background rounded-3xl max-w-2xl w-full max-h-[90vh] border border-border shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-card border-b border-border px-6 md:px-8 py-6 flex justify-between items-start gap-4 rounded-t-3xl z-10">
                <div>
                  <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${getTypeColor(selectedOpportunity.type)}`}>
                    {selectedOpportunity.type}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{selectedOpportunity.title}</h2>
                  <p className="text-muted-foreground mt-2">{selectedOpportunity.company}</p>
                  {selectedOpportunity.startDate && selectedOpportunity.endDate && (
                    <p className="text-xs text-muted-foreground font-medium mt-2">
                      {new Date(selectedOpportunity.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(selectedOpportunity.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOpportunity(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      Location
                    </div>
                    <p className="text-foreground font-bold">{selectedOpportunity.location}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      Time
                    </div>
                    <p className="text-foreground font-bold">{selectedOpportunity.timings}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Fee
                    </div>
                    <p className="text-foreground font-bold">{selectedOpportunity.stipend === 'Free' ? 'Free' : selectedOpportunity.stipend}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      Mode
                    </div>
                    <p className="text-foreground font-bold">{selectedOpportunity.mode}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">About</h3>
                  <p className="text-muted-foreground">{selectedOpportunity.description}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.about.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Who Can Attend</h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.qualification.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Perks & Inclusions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.perks.map(perk => (
                      <span key={perk} className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border bg-card px-6 md:px-8 py-6 space-y-3 sticky bottom-0 z-10 rounded-b-3xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold transition-all hover:shadow-lg"
                >
                  Register Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border border-border rounded-2xl hover:bg-muted transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5 text-foreground" />
                  <span className="text-foreground font-bold">Share</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
