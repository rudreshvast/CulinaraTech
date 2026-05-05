import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarRating } from '@/components/shared/StarRating';
import type { Review } from '@/lib/types';

interface CourseReviewsProps {
  reviews: Review[];
  averageRating: number;
  ratingDistribution: Record<string, number>;
  totalReviews: number;
}

export function CourseReviews({
  reviews,
  averageRating,
  ratingDistribution,
  totalReviews,
}: CourseReviewsProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRatingPercentage = (rating: number): number => {
    if (totalReviews === 0) return 0;
    return ((ratingDistribution[rating] || 0) / totalReviews) * 100;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Student reviews</h2>

        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Overall Rating */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-5xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
            <StarRating rating={averageRating} size="md" />
            <p className="text-sm text-muted-foreground">
              {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground w-8">
                  {rating} ★
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {Math.round(getRatingPercentage(rating))}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {getInitials(review.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {review.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(review.rating)
                        ? 'fill-primary text-primary'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              {review.comment && (
                <p className="text-sm text-foreground leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
}
