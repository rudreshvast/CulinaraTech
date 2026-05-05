'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { Badge } from '@/components/ui/badge';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { useAuthStore } from '@/lib/stores/auth.store';
import {
  useEnrollFree,
  useInitiatePayment,
  useEnrollmentCheck,
} from '@/lib/hooks/useEnrollments';
import { useToast } from '@/hooks/use-toast';
import type { CourseListItem } from '@/lib/types';

interface EnrollmentCardProps {
  course: CourseListItem;
  thumbnail: string | null;
  sectionCount: number;
  lectureCount: number;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function EnrollmentCard({
  course,
  thumbnail,
  sectionCount,
  lectureCount,
}: EnrollmentCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { error: errorToast, success: successToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: enrollmentCheck, isLoading: isCheckingEnrollment } = isAuthenticated
    ? useEnrollmentCheck(course.id)
    : { data: undefined, isLoading: false };
  const { mutate: enrollFree, isPending: isEnrollingFree } = useEnrollFree();
  const { mutate: initiatePayment, isPending: isInitiatingPayment } =
    useInitiatePayment();

  const isEnrolled = enrollmentCheck?.data?.data?.enrolled ?? false;
  const isLoading = isEnrollingFree || isInitiatingPayment || isCheckingEnrollment;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (course.price === 0) {
      enrollFree(course.id, {
        onSuccess: () => {
          successToast(
            'Success',
            'Successfully enrolled in the course!'
          );
          setTimeout(() => {
            router.push(`/learn/${course.id}`);
          }, 1500);
        },
        onError: (error: any) => {
          errorToast(
            'Error',
            error.response?.data?.message || 'Failed to enroll'
          );
        },
      });
    } else {
      initiatePayment(course.id, {
        onSuccess: () => {
          successToast(
            'Success',
            'Payment successful! Redirecting to course...'
          );
          setTimeout(() => {
            router.push(`/learn/${course.id}`);
          }, 1500);
        },
        onError: (error: any) => {
          errorToast(
            'Error',
            error.response?.data?.message || 'Payment failed'
          );
        },
      });
    }
  };

  const handleGoToCourse = () => {
    router.push(`/learn/${course.id}`);
  };

  return (
    <>
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login Required"
        description="Please login to your account to enroll in this course."
      />
      <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col gap-4 p-6">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <Image
              src={thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
        )}

      {/* Price */}
      <div>
        <PriceDisplay price={course.price} />
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <Button
          onClick={isEnrolled ? handleGoToCourse : handleEnroll}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEnrolled
            ? 'Go to Course'
            : course.price === 0
              ? 'Enroll for Free'
              : `Buy Now ₹${course.price}`}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
          />
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </Button>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Course Includes */}
      <div className="space-y-3">
        <p className="font-semibold text-foreground text-sm">
          This course includes:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            {lectureCount} lecture{lectureCount !== 1 ? 's' : ''}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            {formatDuration(course.totalDuration)} of video
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Full lifetime access
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Certificate of completion
          </li>
        </ul>
      </div>
      </div>
    </>
  );
}
