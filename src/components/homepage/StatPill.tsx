'use client';

import { BookOpen, Briefcase, Award, Building2 } from 'lucide-react';

interface StatPillProps {
  label: string;
  value: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Courses: <BookOpen className="w-5 h-5" />,
  Internships: <Briefcase className="w-5 h-5" />,
  'Training Programs': <Award className="w-5 h-5" />,
  'Job Openings': <Building2 className="w-5 h-5" />,
};

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-3 flex items-center gap-2">
      {iconMap[label]}
      <div>
        <div className="font-bold text-lg">{value}</div>
        <div className="text-xs text-white/80">{label}</div>
      </div>
    </div>
  );
}
