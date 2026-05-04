import { Skeleton } from '@/components/ui/skeleton';
import { CourseCard } from './CourseCard';
import type { CourseListItem } from '@/lib/types';

interface CourseGridProps {
  courses: CourseListItem[];
  isLoading: boolean;
}

export function CourseGrid({ courses, isLoading }: CourseGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
            <div className="pt-2 space-y-2">
              <Skeleton className="h-4 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 col-span-full">
        <div className="text-center space-y-3">
          <div className="text-5xl">🔍</div>
          <h3 className="text-lg font-semibold text-foreground">
            No courses found
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
