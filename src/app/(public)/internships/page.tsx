'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
  Filter,
  X,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Internship } from '@/lib/types';
import { internships } from '@/lib/data/internships';

type SortOption = 'latest' | 'highest-stipend' | 'closing-soon';
type StipendRange = 'any' | '10k' | '15k' | '18k';

export default function InternshipsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedStipend, setSelectedStipend] = useState<StipendRange>('any');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['Quality & Safety', 'R&D', 'Production', 'Supply Chain', 'Regulatory Affairs'];
  const locationTypes = ['On-site', 'Hybrid', 'Remote'];
  const durations = ['2 Months', '3 Months', '4 Months', '6 Months'];

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

  const toggleDuration = (dur: string) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
    );
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedLocationTypes([]);
    setSelectedDurations([]);
    setSelectedStipend('any');
    setSortBy('latest');
  };

  const getStipendValue = (stipendText: string): number => {
    const match = stipendText.match(/₹(\d+),?(\d*)/);
    if (match) {
      return parseInt(match[1] + (match[2] || '')) * (match[2] ? 1 : 1000);
    }
    return 0;
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = internships.filter((internship) => {
      const matchesSearch =
        search === '' ||
        internship.title.toLowerCase().includes(search.toLowerCase()) ||
        internship.company.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(internship.category);

      const matchesLocationType =
        selectedLocationTypes.length === 0 ||
        selectedLocationTypes.includes(internship.locationType);

      const matchesDuration =
        selectedDurations.length === 0 ||
        selectedDurations.includes(internship.duration);

      let matchesStipend = true;
      if (selectedStipend !== 'any') {
        const stipendValue = getStipendValue(internship.stipend);
        const minimums = {
          '10k': 10000,
          '15k': 15000,
          '18k': 18000,
        };
        matchesStipend = stipendValue >= minimums[selectedStipend];
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocationType &&
        matchesDuration &&
        matchesStipend
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      } else if (sortBy === 'highest-stipend') {
        return getStipendValue(b.stipend) - getStipendValue(a.stipend);
      } else if (sortBy === 'closing-soon') {
        return new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime();
      }
      return 0;
    });

    return filtered;
  }, [search, selectedCategories, selectedLocationTypes, selectedDurations, selectedStipend, sortBy]);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isClosingSoon = (dateStr: string): boolean => {
    const now = new Date();
    const lastDate = new Date(dateStr);
    const daysLeft = (lastDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  };

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      Urgent: 'bg-destructive text-destructive-foreground',
      Hot: 'bg-orange-500 text-white',
      New: 'bg-green-500 text-white',
      'Closing Soon': 'bg-yellow-500 text-black',
      Popular: 'bg-blue-500 text-white',
    };
    return colors[badge] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 px-4 py-12 text-white sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl">
            Food Processing Internships
          </h1>
          <p className="mb-8 text-lg text-green-100 sm:text-xl">
            Gain hands-on experience at India's leading food companies
          </p>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-bold">{internships.length}</span>
              <span>Open Positions</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Top Companies</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-bold">Paid</span>
              <span>Internships</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden flex-shrink-0 lg:block w-72">
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

              {/* Duration Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Duration</h3>
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <label key={dur} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(dur)}
                        onChange={() => toggleDuration(dur)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{dur}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stipend Range Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Stipend Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any' as const, label: 'Any' },
                    { value: '10k' as const, label: '₹10,000+' },
                    { value: '15k' as const, label: '₹15,000+' },
                    { value: '18k' as const, label: '₹18,000+' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="stipend"
                        value={option.value}
                        checked={selectedStipend === option.value}
                        onChange={(e) => setSelectedStipend(e.target.value as StipendRange)}
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
                  Showing <span className="font-semibold text-foreground">{filteredAndSorted.length}</span> internships
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
                  <option value="highest-stipend">Highest Stipend</option>
                  <option value="closing-soon">Closing Soon</option>
                </select>
              </div>
            </div>

            {/* Internship Cards Grid */}
            {filteredAndSorted.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredAndSorted.map((internship) => (
                  <div
                    key={internship.id}
                    className="group relative flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md"
                  >
                    {/* Header with Logo, Featured Badge, and Badge */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={internship.companyLogo}
                            alt={internship.company}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {internship.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{internship.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {internship.featured && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-900">
                            Featured
                          </Badge>
                        )}
                        <Badge className={getBadgeColor(internship.badge)}>
                          {internship.badge}
                        </Badge>
                      </div>
                    </div>

                    {/* Pills: Location, Type, Duration */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        {internship.locationType}
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {internship.duration}
                      </div>
                    </div>

                    {/* Stipend and Openings */}
                    <div className="mb-4 flex items-baseline justify-between">
                      <span className="font-bold text-green-600">{internship.stipend}</span>
                      <span className="text-sm text-muted-foreground">{internship.openings} openings</span>
                    </div>

                    {/* Skills Pills */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {internship.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                      {internship.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs font-normal">
                          +{internship.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Last Date */}
                    <div className="mb-4">
                      <span
                        className={`text-xs font-medium ${
                          isClosingSoon(internship.lastDate)
                            ? 'text-destructive'
                            : 'text-muted-foreground'
                        }`}
                      >
                        Apply by {formatDate(internship.lastDate)}
                        {isClosingSoon(internship.lastDate) && ' ⚠️'}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Link
                        href={`/internships/${internship.slug}`}
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
                <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  No internships match your filters
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

              {/* Duration Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Duration</h3>
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <label key={dur} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(dur)}
                        onChange={() => toggleDuration(dur)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{dur}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stipend Range Filter */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Stipend Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any' as const, label: 'Any' },
                    { value: '10k' as const, label: '₹10,000+' },
                    { value: '15k' as const, label: '₹15,000+' },
                    { value: '18k' as const, label: '₹18,000+' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="stipend"
                        value={option.value}
                        checked={selectedStipend === option.value}
                        onChange={(e) => setSelectedStipend(e.target.value as StipendRange)}
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
    </div>
  );
}
