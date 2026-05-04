import { Badge } from '@/components/ui/badge';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
}

export function PriceDisplay({ price, originalPrice }: PriceDisplayProps) {
  if (price === 0) {
    return (
      <Badge className="w-fit bg-secondary text-secondary-foreground hover:bg-secondary/90">
        Free
      </Badge>
    );
  }

  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  if (originalPrice && originalPrice > price) {
    const originalFormatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(originalPrice);

    return (
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">{formatted}</span>
        <span className="line-through text-xs text-muted-foreground">
          {originalFormatted}
        </span>
      </div>
    );
  }

  return <span className="font-semibold text-foreground">{formatted}</span>;
}
