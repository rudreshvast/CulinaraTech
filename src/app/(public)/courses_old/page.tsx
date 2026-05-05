'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { useCourses, useCategories } from '@/lib/hooks/useCourses';
import type { CourseQueryParams } from '@/lib/types';

export default function CourseCatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  // Parse URL params
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const level = searchParams.get('level') || '';
  const sort = searchParams.get('sort') || '';

  // Build query params
  const queryParams: CourseQueryParams = {
    page,
    limit: 12,
    ...(search && { search }),
    ...(categoryId && { categoryId }),
    ...(level && { level: level as any }),
    ...(sort && { sort: sort as any }),
  };

  // Fetch data
  const { data: coursesData, isLoading: coursesLoading } = useCourses(queryParams);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const courses = coursesData?.data?.data?.data || [];
  const totalPages = coursesData?.data?.data?.totalPages || 1;
  const totalResults = coursesData?.data?.data?.total || 0;
  const categories = categoriesData?.data?.data || [];

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set('search', searchInput);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('categoryId', id);
    } else {
      params.delete('categoryId');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHero = !search;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      {showHero && (
        <section className="bg-primary text-primary-foreground py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Learn without limits</h1>
            <p className="text-lg text-primary-foreground/90">
              Explore thousands of courses from expert instructors
            </p>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search for anything"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-12 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </section>
      )}

      {/* Category Pills */}
      {!categoriesLoading && categories.length > 0 && (
        <div className="border-b border-border bg-background sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <Badge
                variant={!categoryId ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  !categoryId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
                onClick={() => handleCategorySelect('')}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={categoryId === cat.id ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap ${
                    categoryId === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  }`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <CourseFilters />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filters + Results Header */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  {totalResults > 0
                    ? `${totalResults} course${totalResults !== 1 ? 's' : ''} found`
                    : 'No courses found'}
                </p>
              </div>
              <div className="lg:hidden">
                <CourseFilters isSheet />
              </div>
            </div>

            {/* Course Grid */}
            <CourseGrid courses={courses} isLoading={coursesLoading} />

            {/* Pagination */}
            {totalPages > 1 && !coursesLoading && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={page === p ? 'default' : 'outline'}
                    onClick={() => handlePageChange(p)}
                    className={page === p ? 'bg-primary text-primary-foreground' : ''}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
