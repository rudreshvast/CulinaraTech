interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
}

export function ProgressBar({ percentage, showLabel = true }: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const isComplete = clampedPercentage === 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isComplete ? 'bg-green-500' : 'bg-primary'
            }`}
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>
        {showLabel && (
          <span className="text-sm text-muted-foreground ml-3">
            {clampedPercentage}%
          </span>
        )}
      </div>
    </div>
  );
}
