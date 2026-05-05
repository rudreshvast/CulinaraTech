'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  ChevronRight,
  Filter,
  X,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { useAuthStore } from '@/lib/stores/auth.store';
import { Job } from '@/lib/types';
import { jobs } from '@/lib/data/jobs';

type SortOption = 'latest' | 'highest-salary' | 'closing-soon';
type SalaryRange = 'any' | '5lpa' | '10lpa' | '18lpa' | '25lpa';
type ExperienceLevel = 'any' | '0-3' | '3-7' | '7-12' | '12+';

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel>('any');
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<SalaryRange>('any');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
  };

  const categories = [
    'Quality & Safety',
    'R&D',
    'Operations & Manufacturing',
    'Regulatory Affairs',
    'Production & Manufacturing',
    'Export & Trade',
  ];
  const locationTypes = ['On-site', 'Hybrid', 'Remote'];
  const employmentTypes = ['Full-Time', 'Contract', 'Part-Time'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleLocationType = (type: string) => {
    setSelectedLocationTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleEmploymentType = (type: string) => {
    setSelectedEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedExperience('any');
    setSelectedLocationTypes([]);
    setSelectedEmploymentTypes([]);
    setSelectedSalary('any');
    setSortBy('latest');
  };

  const getSalaryValue = (salaryText: string): number => {
    const match = salaryText.match(/₹(\d+)/);
    if (match) {
      return parseInt(match[1]) * 100000;
    }
    return 0;
  };

  const experienceMap: Record<ExperienceLevel, string[]> = {
    'any': [],
    '0-3': ['0–3 Years'],
    '3-7': ['2–5 Years', '3–6 Years', '3–7 Years'],
    '7-12': ['8–12 Years'],
    '12+': ['12–18 Years', '12+ Years'],
  };

  const salaryMinimums: Record<SalaryRange, number> = {
    'any': 0,
    '5lpa': 500000,
    '10lpa': 1000000,
    '18lpa': 1800000,
    '25lpa': 2500000,
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        search === '' ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      const matchesExperience =
        selectedExperience === 'any' ||
        experienceMap[selectedExperience].includes(job.experience);

      const matchesLocationType =
        selectedLocationTypes.length === 0 ||
        selectedLocationTypes.includes(job.locationType);

      const matchesEmploymentType =
        selectedEmploymentTypes.length === 0 ||
        selectedEmploymentTypes.includes(job.employmentType);

      let matchesSalary = true;
      if (selectedSalary !== 'any') {
        const salaryValue = getSalaryValue(job.salary);
        matchesSalary = salaryValue >= salaryMinimums[selectedSalary];
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesExperience &&
        matchesLocationType &&
        matchesEmploymentType &&
        matchesSalary
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      } else if (sortBy === 'highest-salary') {
        return getSalaryValue(b.salary) - getSalaryValue(a.salary);
      } else if (sortBy === 'closing-soon') {
        return new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime();
      }
      return 0;
    });

    return filtered;
  }, [search, selectedCategories, selectedExperience, selectedLocationTypes, selectedEmploymentTypes, selectedSalary, sortBy]);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysAgo = (dateStr: string): string => {
    const now = new Date();
    const postedDate = new Date(dateStr);
    const daysAgo = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return 'Posted today';
    if (daysAgo === 1) return 'Posted yesterday';
    return `Posted ${daysAgo} days ago`;
  };

  const isClosingSoon = (dateStr: string): boolean => {
    const now = new Date();
    const lastDate = new Date(dateStr);
    const daysLeft = (lastDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  };

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Senior Role': 'bg-purple-500 text-white',
      'Actively Hiring': 'bg-green-500 text-white',
      'Leadership Role': 'bg-blue-500 text-white',
      'Hybrid': 'bg-indigo-500 text-white',
      'Niche Role': 'bg-orange-500 text-white',
      'Multiple Openings': 'bg-teal-500 text-white',
    };
    return colors[badge] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 px-4 py-12 text-white sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl">
            Food Processing Jobs
          </h1>
          <p className="mb-8 text-lg text-indigo-100 sm:text-xl">
            Full-time roles at India's leading food manufacturing and FMCG companies
          </p>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-bold">{jobs.length}</span>
              <span>Open Positions</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-bold">Pan-India</span>
              <span>Locations</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Top FMCG Companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden flex-shrink-0 lg:block w-80">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Experience</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any' as const, label: 'Any' },
                    { value: '0-3' as const, label: '0–3 Years' },
                    { value: '3-7' as const, label: '3–7 Years' },
                    { value: '7-12' as const, label: '7–12 Years' },
                    { value: '12+' as const, label: '12+ Years' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={selectedExperience === option.value}
                        onChange={(e) => setSelectedExperience(e.target.value as ExperienceLevel)}
                        className="border-border"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Type Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Location Type</h3>
                <div className="space-y-2">
                  {locationTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocationTypes.includes(type)}
                        onChange={() => toggleLocationType(type)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employment Type Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Employment Type</h3>
                <div className="space-y-2">
                  {employmentTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedEmploymentTypes.includes(type)}
                        onChange={() => toggleEmploymentType(type)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Salary Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any' as const, label: 'Any' },
                    { value: '5lpa' as const, label: '₹5 LPA+' },
                    { value: '10lpa' as const, label: '₹10 LPA+' },
                    { value: '18lpa' as const, label: '₹18 LPA+' },
                    { value: '25lpa' as const, label: '₹25 LPA+' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="salary"
                        value={option.value}
                        checked={selectedSalary === option.value}
                        onChange={(e) => setSelectedSalary(e.target.value as SalaryRange)}
                        className="border-border"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar with Filter Button and Sort */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredAndSorted.length}</span> jobs
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="latest">Latest First</option>
                  <option value="highest-salary">Highest Salary</option>
                  <option value="closing-soon">Closing Soon</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            {filteredAndSorted.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSorted.map((job) => (
                  <div
                    key={job.id}
                    className="group flex gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md"
                  >
                    {/* Company Logo */}
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded border border-border">
                      <Image
                        src={job.companyLogo}
                        alt={job.company}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title Row with Badges */}
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <Link href={`/opportunities/${job.slug}`}>
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {job.title}
                            </h3>
                          </Link>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end flex-shrink-0">
                          {job.featured && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-900 text-xs">
                              Featured
                            </Badge>
                          )}
                          <Badge className={`${getBadgeColor(job.badge)} text-xs`}>
                            {job.badge}
                          </Badge>
                        </div>
                      </div>

                      {/* Company Name and Type */}
                      <div className="mb-3 flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">{job.company}</span>
                        <Badge variant="outline" className="text-xs font-normal">
                          {job.companyType}
                        </Badge>
                      </div>

                      {/* Meta Pills */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {job.locationType}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {job.employmentType}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {job.experience}
                        </div>
                      </div>

                      {/* Salary Row */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-green-600">{job.salary}</span>
                          {job.salaryNegotiable && (
                            <Badge variant="outline" className="text-xs font-normal text-green-700 bg-green-50">
                              Negotiable
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Skills Pills */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        {job.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs font-normal">
                            +{job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>

                      {/* Bottom Info Row */}
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span>{job.openings} opening{job.openings !== 1 ? 's' : ''} available</span>
                        <span>{getDaysAgo(job.postedDate)}</span>
                        <span
                          className={isClosingSoon(job.lastDate) ? 'text-destructive font-medium' : ''}
                        >
                          Apply by {formatDate(job.lastDate)}
                          {isClosingSoon(job.lastDate) && ' ⚠️'}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Link href={`/opportunities/${job.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Button onClick={handleApplyClick} className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
                <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  No jobs match your filters
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Try clearing some filters to see more opportunities
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-background p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Experience</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any' as const, label: 'Any' },
                    { value: '0-3' as const, label: '0–3 Years' },
                    { value: '3-7' as const, label: '3–7 Years' },
                    { value: '7-12' as const, label: '7–12 Years' },
                    { value: '12+' as const, label: '12+ Years' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={selectedExperience === option.value}
                        onChange={(e) => setSelectedExperience(e.target.value as ExperienceLevel)}
                        className="border-border"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Type Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Location Type</h3>
                <div className="space-y-2">
                  {locationTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocationTypes.includes(type)}
                        onChange={() => toggleLocationType(type)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employment Type Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Employment Type</h3>
                <div className="space-y-2">
                  {employmentTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedEmploymentTypes.includes(type)}
                        onChange={() => toggleEmploymentType(type)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Salary Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any' as const, label: 'Any' },
                    { value: '5lpa' as const, label: '₹5 LPA+' },
                    { value: '10lpa' as const, label: '₹10 LPA+' },
                    { value: '18lpa' as const, label: '₹18 LPA+' },
                    { value: '25lpa' as const, label: '₹25 LPA+' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="salary"
                        value={option.value}
                        checked={selectedSalary === option.value}
                        onChange={(e) => setSelectedSalary(e.target.value as SalaryRange)}
                        className="border-border"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login Required"
        description="Please login to your account to apply for jobs."
      />
    </div>
  );
}
