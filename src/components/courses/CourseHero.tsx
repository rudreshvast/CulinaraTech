import { Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/shared/StarRating';
import type { CourseDetail } from '@/lib/types';

interface CourseHeroProps {
  course: CourseDetail;
}

export function CourseHero({ course }: CourseHeroProps) {
  const durationInHours = course.totalDuration / 3600;
  const durationText =
    durationInHours < 1
      ? `${Math.round(course.totalDuration / 60)}m`
      : `${Math.round(durationInHours)}h`;

  return (
    <section className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
          <a href="/" className="hover:text-primary-foreground transition-colors">
            Home
          </a>
          <span>/</span>
          <a href={`?categoryId=${course.category.id}`} className="hover:text-primary-foreground transition-colors">
            {course.category.name}
          </a>
          <span>/</span>
          <span className="text-primary-foreground">{course.title}</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl line-clamp-3">
            {course.description.substring(0, 150)}
            {course.description.length > 150 ? '...' : ''}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <StarRating rating={course.averageRating} count={course.reviewCount} />
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{course.enrollmentCount.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{durationText}</span>
          </div>
          <Badge className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            {course.level}
          </Badge>
        </div>

        {/* Instructor & Metadata */}
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <span>Created by </span>
            <a
              href="#"
              className="font-semibold hover:underline text-primary-foreground"
            >
              {course.instructor.name}
            </a>
          </div>
          <div className="text-primary-foreground/80">
            Last updated {new Date(course.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </section>
  );
}
