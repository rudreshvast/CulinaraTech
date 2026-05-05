'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from './ProgressBar';
interface EnrolledCourseCardProps {
  enrollment: any;
  completionPercentage: number;
  completedLectures: number;
  totalLectures: number;
}

export function EnrolledCourseCard({
  enrollment,
  completionPercentage,
  completedLectures,
  totalLectures,
}: EnrolledCourseCardProps) {
  const router = useRouter();
  const isComplete = completionPercentage === 100;

  const handleContinueLearning = () => {
    router.push(`/learn/${enrollment.course.id}`);
  };

  const handleViewCertificate = () => {
    router.push(`/learn/${enrollment.course.id}/certificate`);
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {enrollment.course.thumbnailUrl ? (
          <Image
            src={enrollment.course.thumbnailUrl}
            alt={enrollment.course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No thumbnail
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title & Instructor */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 text-sm mb-1">
            {enrollment.course.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {enrollment.course.instructor.name}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <ProgressBar percentage={completionPercentage} />
          <p className="text-xs text-muted-foreground">
            {completedLectures} of {totalLectures} lectures completed
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={handleContinueLearning}
          >
            {isComplete ? 'View' : 'Continue'} Learning
          </Button>
          {isComplete && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewCertificate}
            >
              Certificate
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
