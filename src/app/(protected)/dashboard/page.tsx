'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { Star, LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { GAUGES, COURSES, OPPORTUNITIES, TIMELINE } from '@/data/dashboard';
import { courses } from '@/lib/course-data';

function RingGauge({
  value,
  unit,
  title,
  sub,
  chip,
}: {
  value: number;
  unit: string;
  title: string;
  sub: string;
  chip: string;
}) {
  const getColor = () => {
    return '#4b17e3';
  };

  const data = [
    { name: 'progress', value: value },
    { name: 'remaining', value: 100 - value },
  ];

  return (
    <div className="flex items-center gap-6 p-6 bg-card border border-border rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow">
      <div className="relative w-28 h-28 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={56}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={getColor()} />
              <Cell fill="#efedf1" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-foreground">{value}%</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        <div className="mt-3 inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-semibold">
          {chip}
        </div>
      </div>
    </div>
  );
}

function CourseRow({
  title,
  last,
  progress,
  icon: Icon,
  accentVar,
  slug,
}: {
  title: string;
  last: string;
  progress: number;
  icon: LucideIcon;
  accentVar: string;
  slug?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-[12px] border border-outline-variant/20 bg-card hover:bg-surface-container/50 hover:border-outline-variant/40 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <div
        className="w-14 h-11 rounded-[8px] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `hsl(var(${accentVar}) / 0.1)` }}
      >
        <Icon className="w-6 h-6" style={{ color: `hsl(var(${accentVar}))` }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{last}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground shrink-0">{progress}%</span>
        </div>
      </div>
      <Link
        href={slug ? `/courses/${slug}` : '#'}
        className="bg-primary hover:bg-primary-600 text-primary-foreground text-white text-xs py-1.5 px-4 rounded-full shrink-0 transition-all shadow-[0_2px_8px_rgba(75,23,227,0.15)]"
      >
        Resume
      </Link>
    </div>
  );
}

function CourseCard({
  title,
  instructor,
  rating,
  reviews,
  price,
  image,
  badge,
  slug,
}: {
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  price: string;
  image: string;
  badge: string;
  slug?: string;
}) {
  return (
    <Link href={slug ? `/courses/${slug}` : '#'} className="min-w-[240px] max-w-[240px] overflow-hidden bg-card border border-border rounded-[16px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all hover:scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.05)] block">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
          {badge}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3 border-t border-surface-container">
        <div>
          <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-tight">{title}</h4>
          <p className="text-xs text-muted-foreground mt-2">{instructor}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">({reviews})</span>
        </div>

        {/* Price */}
        <p className="text-sm font-bold text-primary">{price}</p>
      </div>
    </Link>
  );
}

function TimelineItem({
  icon: Icon,
  color,
  title,
  desc,
  time,
}: {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
  time: string;
}) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-on-secondary',
    tertiary: 'bg-tertiary text-on-tertiary',
    amber: 'bg-amber-500 text-white',
  };

  return (
    <div className="flex gap-3 pb-4">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${colorMap[color] || 'bg-primary'}`}>
        <Icon className="w-3 h-3" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground">{title}</p>
        <p className="text-[10px] text-muted-foreground">{desc}</p>
        <p className="text-[10px] text-outline mt-1">{time}</p>
      </div>
    </div>
  );
}

interface CarouselCourse {
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  price: string;
  image: string;
  slug?: string;
}

function CourseCarousel({
  title,
  courses,
  badge,
  viewAllLink = '#',
}: {
  title: string;
  courses: CarouselCourse[];
  badge: string;
  viewAllLink?: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 260;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="bg-card border border-border rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <a href={viewAllLink} className="text-primary text-sm font-semibold hover:text-primary-600 transition-colors">
          See all ({courses.length})
        </a>
      </div>

      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border rounded-full p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all opacity-0 group-hover:opacity-100"
            title="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          onLoad={checkScroll}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-none scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course.title} {...course} slug={course.slug} badge={badge} />
          ))}
          {courses.length > 4 && (
            <div className="min-w-[240px] max-w-[240px] h-96 bg-card border border-dashed border-border rounded-[16px] flex items-center justify-center flex-shrink-0">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">+{courses.length - 4}</p>
                <p className="text-sm text-muted-foreground mt-2">more courses</p>
              </div>
            </div>
          )}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border rounded-full p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all opacity-0 group-hover:opacity-100"
            title="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();

  // Filter trending courses (those with badges)
  const trendingCourses = courses
    .filter((c) => c.badge && ['Trending', 'Hot', 'Popular'].includes(c.badge))
    .slice(0, 4)
    .map((c) => ({
      title: c.title,
      instructor: c.instructor?.name || 'Instructor',
      rating: c.rating || 4.5,
      reviews: c.reviews || '250',
      price: c.price,
      image: c.image || 'https://via.placeholder.com/240x160',
      slug: c.slug,
    }));

  // Filter bestseller courses (top rated)
  const bestsellerCourses = courses
    .filter((c) => !c.badge || !['Trending', 'Hot', 'Popular'].includes(c.badge))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)
    .map((c) => ({
      title: c.title,
      instructor: c.instructor?.name || 'Instructor',
      rating: c.rating || 4.5,
      reviews: c.reviews || '250',
      price: c.price,
      image: c.image || 'https://via.placeholder.com/240x160',
      slug: c.slug,
    }));

  return (
    <div className="min-h-screen bg-background px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-8" style={{ paddingBottom: 'max(calc(1.75rem + env(safe-area-inset-bottom)), 7rem)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-end xs:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-headline">Welcome back, {user?.name?.split(' ')[0] || 'Rudresh'}</h2>
            <p className="text-sm text-muted-foreground mt-2">Skill up, stand out, and succeed.</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Ring Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {GAUGES.map((gauge) => (
                <RingGauge key={gauge.unit} {...gauge} />
              ))}
            </div>

            {/* My Courses */}
            <div className="bg-card border border-border rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground">My courses</h3>
                <a href="#" className="text-primary text-sm font-semibold hover:text-primary-600 transition-colors">
                  View all
                </a>
              </div>
              <div className="space-y-3">
                {COURSES.map((course) => {
                  const catalogCourse = courses.find(c => c.title === course.title);
                  return (
                    <CourseRow key={course.title} {...course} slug={catalogCourse?.slug} />
                  );
                })}
              </div>
            </div>

            {/* Trending Courses */}
            <CourseCarousel
              title="Trending courses"
              courses={trendingCourses}
              badge="Trending"
              viewAllLink="/courses"
            />

            {/* Bestseller Courses */}
            <CourseCarousel
              title="Bestseller courses"
              courses={bestsellerCourses}
              badge="Bestseller"
              viewAllLink="/courses"
            />
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 lg:shrink-0 space-y-6">
            {/* Training Opportunities - Glassmorphism */}
            <div className="relative rounded-[16px] p-6 overflow-hidden shadow-[0_8px_32px_rgba(75,23,227,0.15)]"
              style={{
                background: 'linear-gradient(135deg, #4b17e3 0%, #6440fb 100%)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)' }} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base text-white font-semibold font-headline">Training opportunities</h4>
                  <div className="bg-white/20 text-white text-[11px] font-semibold rounded-full px-3 py-1">
                    9 open
                  </div>
                </div>
                <p className="text-xs text-white/80 mb-4">Matched to your profile</p>
                <div className="space-y-3 mb-4">
                  {OPPORTUNITIES.map((opp) => (
                    <Link key={opp.org} href="/opportunities" className="block bg-white/10 rounded-[8px] p-3 border border-white/10 hover:bg-white/20 transition-colors">
                      <p className="text-xs font-semibold text-white">{opp.org}</p>
                      <p className="text-[10px] text-white/85 mt-1">{opp.role}</p>
                      <p className="text-[10px] text-white/60 mt-1">
                        {opp.location} · {opp.stipend} · {opp.duration}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link href="/opportunities" className="block w-full rounded-full bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-semibold py-2.5 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.25)] text-center">
                  Explore all opportunities
                </Link>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-card border border-border rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <h4 className="text-lg font-bold text-foreground mb-4 font-headline">Activity timeline</h4>
              <div className="space-y-2">
                {TIMELINE.map((item, idx) => (
                  <TimelineItem key={idx} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
