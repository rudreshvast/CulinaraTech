import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, count, size = 'md' }: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    if (rating >= starValue) {
      return 'full';
    } else if (rating >= starValue - 0.5) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {stars.map((fill, i) => (
          <div key={i} className="relative">
            <Star
              className={`${sizeClass} text-border transition-colors`}
              strokeWidth={1.5}
            />
            {(fill === 'full' || fill === 'half') && (
              <div
                className={`absolute top-0 left-0 overflow-hidden transition-colors ${
                  fill === 'half' ? 'w-1/2' : 'w-full'
                }`}
              >
                <Star
                  className={`${sizeClass} fill-primary text-primary`}
                  strokeWidth={1.5}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({count.toLocaleString()} ratings)
        </span>
      )}
    </div>
  );
}
