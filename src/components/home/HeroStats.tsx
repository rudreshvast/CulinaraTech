'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Factory, Building2 } from 'lucide-react';

const stats = [
  { value: 10, label: 'Courses', icon: GraduationCap },
  { value: 6, label: 'Internships', icon: Briefcase },
  { value: 12, label: 'Training Programs', icon: Factory },
  { value: 6, label: 'Job Openings', icon: Building2 },
];

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easeOut * target);
      setCount(value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <span>{count}</span>;
}

export function HeroStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 hover:bg-white/15 transition-colors cursor-pointer group"
          >
            <Icon className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-2xl text-white">
              <AnimatedCounter target={stat.value} />
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
