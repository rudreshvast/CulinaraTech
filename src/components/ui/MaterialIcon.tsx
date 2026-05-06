interface MaterialIconProps {
  icon: string;
  className?: string;
}

export function MaterialIcon({ icon, className = '' }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined text-2xl ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
    >
      {icon}
    </span>
  );
}
