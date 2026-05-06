'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  { number: 10, label: 'Online Courses', suffix: '+' },
  { number: 6, label: 'Open Internships', suffix: '' },
  { number: 12, label: 'Training Programs', suffix: '' },
  { number: 6, label: 'Job Openings', suffix: '' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let animationFrameId: number;
          let startTime: number;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const duration = 1500;
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
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  );
}

export function CountUpBar() {
  return (
    <div className="w-full bg-[#1a5c38] py-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
              {idx < 3 && <div className="hidden lg:block w-px h-8 bg-white/20 absolute right-0 top-1/2 -translate-y-1/2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
