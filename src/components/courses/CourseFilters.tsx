'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { CourseLevel } from '@/lib/types';

const LEVEL_OPTIONS: { value: CourseLevel | ''; label: string }[] = [
  { value: '', label: 'All Levels' },
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rated', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

interface CourseFiltersProps {
  isSheet?: boolean;
}

function FilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLevel = (searchParams.get('level') || '') as CourseLevel | '';
  const currentSort = searchParams.get('sort') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push('/', { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Level Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Level</h3>
        <RadioGroup
          value={currentLevel}
          onValueChange={(value: string) => updateFilter('level', value)}
        >
          {LEVEL_OPTIONS.map((option) => (
            <div key={option.value || 'all'} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value={option.value}
                id={`level-${option.value || 'all'}`}
              />
              <label
                htmlFor={`level-${option.value || 'all'}`}
                className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Sort by</h3>
        <RadioGroup
          value={currentSort}
          onValueChange={(value: string) => updateFilter('sort', value)}
        >
          {SORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value={option.value}
                id={`sort-${option.value}`}
              />
              <label
                htmlFor={`sort-${option.value}`}
                className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Clear Filters */}
      {(currentLevel || currentSort) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}

export function CourseFilters({ isSheet = false }: CourseFiltersProps) {
  if (isSheet) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="py-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return <FilterContent />;
}
