'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/shared/StarRating';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import type { CourseListItem } from '@/lib/types';

interface CourseCardProps {
  course: CourseListItem;
}

export function CourseCard({ course }: CourseCardProps) {
  const durationInHours = Math.round(course.totalDuration / 3600);
  const durationText =
    durationInHours < 1
      ? `${Math.round(course.totalDuration / 60)}m`
      : `${durationInHours}h`;

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted overflow-hidden group">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted" />
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors">
              <Play className="h-6 w-6 fill-current" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-xs text-muted-foreground">{course.instructor.name}</p>

          {/* Rating */}
          <StarRating
            rating={course.averageRating}
            count={course.reviewCount}
            size="sm"
          />

          {/* Duration & Level */}
          <p className="text-xs text-muted-foreground">
            {durationText} · {course.level}
          </p>

          {/* Price */}
          <div className="pt-2 border-t border-border">
            <PriceDisplay price={course.price} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
