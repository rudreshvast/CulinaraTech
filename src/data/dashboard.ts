import {
  Droplets,
  Beaker,
  Flame,
  Zap,
  FileText,
  CheckCircle,
  Play,
  Star,
  BookOpen,
  LucideIcon,
} from 'lucide-react';

export interface Gauge {
  value: number;
  arcColor: string;
  unit: string;
  title: string;
  sub: string;
  chip: string;
}

export interface Course {
  title: string;
  last: string;
  progress: number;
  icon: LucideIcon;
  accentVar: string;
}

export interface TrendingCourse {
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  price: string;
  icon: LucideIcon;
  bg: string;
  image: string;
}

export interface Opportunity {
  org: string;
  role: string;
  location: string;
  stipend: string;
  duration: string;
}

export interface TimelineItem {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
  time: string;
}

export const GAUGES: Gauge[] = [
  {
    value: 50,
    arcColor: 'hsl(var(--color-primary))',
    unit: 'goal',
    title: 'Weekly study goal',
    sub: '10 of 20 hrs logged this week',
    chip: 'Halfway there',
  },
  {
    value: 85,
    arcColor: 'hsl(var(--color-secondary))',
    unit: 'streak',
    title: 'Learning streak',
    sub: '17-day active streak this month',
    chip: 'On fire',
  },
];

export const COURSES: Course[] = [
  {
    title: 'Milk Pasteurization Fundamentals',
    last: 'UHT & Aseptic Processing · Sec 3',
    progress: 72,
    icon: Droplets,
    accentVar: '--color-primary',
  },
  {
    title: 'Food Quality Control & HACCP',
    last: 'HACCP Principles in Depth · Sec 2',
    progress: 65,
    icon: Beaker,
    accentVar: '--color-secondary',
  },
  {
    title: 'Beverage Processing & Packaging',
    last: 'Carbonated Soft Drink Manufacturing · Sec 2',
    progress: 58,
    icon: Droplets,
    accentVar: '--color-tertiary',
  },
];

export const TRENDING_COURSES: TrendingCourse[] = [
  {
    title: 'Food Quality Control & HACCP',
    instructor: 'Dr. Rajeev Sharma',
    rating: 4.8,
    reviews: '21k',
    price: '₹14,999',
    icon: Beaker,
    bg: 'primary',
    image: 'https://images.unsplash.com/photo-1652211955967-99c892925469?q=80&w=800',
  },
  {
    title: 'Beverage Processing & Packaging',
    instructor: 'Mr. Sanjay Kulkarni',
    rating: 4.5,
    reviews: '7.6k',
    price: '₹13,999',
    icon: Droplets,
    bg: 'amber',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800',
  },
  {
    title: 'Milk Pasteurization Fundamentals',
    instructor: 'Dr. Priya Nair',
    rating: 4.7,
    reviews: '12.8k',
    price: '₹9,999',
    icon: Droplets,
    bg: 'tertiary',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
  },
  {
    title: 'Bakery & Confectionery Technology',
    instructor: 'Chef Ananya Bose',
    rating: 4.6,
    reviews: '9.8k',
    price: '₹12,499',
    icon: Flame,
    bg: 'destructive',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
  },
];

export const BESTSELLER_COURSES: TrendingCourse[] = [
  {
    title: 'Food Safety Fundamentals',
    instructor: 'Dr. Rajeev Sharma',
    rating: 4.9,
    reviews: '18.5k',
    price: '₹11,999',
    icon: Beaker,
    bg: 'secondary',
    image: 'https://images.unsplash.com/photo-1652211955967-99c892925469?q=80&w=800',
  },
  {
    title: 'Dairy Processing Excellence',
    instructor: 'Dr. Priya Nair',
    rating: 4.8,
    reviews: '14.2k',
    price: '₹13,499',
    icon: Droplets,
    bg: 'primary',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
  },
  {
    title: 'Snack Foods Manufacturing',
    instructor: 'Chef Ananya Bose',
    rating: 4.9,
    reviews: '11.8k',
    price: '₹10,999',
    icon: Flame,
    bg: 'amber',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
  },
  {
    title: 'Production Planning & Scheduling',
    instructor: 'Mr. Sanjay Kulkarni',
    rating: 4.8,
    reviews: '9.6k',
    price: '₹12,499',
    icon: Zap,
    bg: 'tertiary',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800',
  },
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    org: 'Amul',
    role: 'Dairy Process Engineering Intern',
    location: 'Anand, Gujarat',
    stipend: '₹12,000/mo',
    duration: '3-6 months',
  },
  {
    org: 'Nestlé India',
    role: 'Food Safety & QA Intern',
    location: 'Moga, Punjab',
    stipend: '₹15,000/mo',
    duration: '3 months',
  },
  {
    org: 'Coca-Cola India',
    role: 'Beverage Production Intern',
    location: 'Pune, Maharashtra',
    stipend: '₹14,000/mo',
    duration: '4-6 months',
  },
  {
    org: 'ITC Foods',
    role: 'Food Process Engineer',
    location: 'Bangalore',
    stipend: '₹6-10 LPA',
    duration: 'Full-time',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    icon: FileText,
    color: 'primary',
    title: 'Applied at Nestlé India',
    desc: 'Food Safety & QA Intern · Moga, Punjab',
    time: 'Today, 9:30 AM',
  },
  {
    icon: CheckCircle,
    color: 'secondary',
    title: 'Completed HACCP Module',
    desc: 'Score: 92/100 · Outstanding',
    time: 'Yesterday, 3:15 PM',
  },
  {
    icon: Play,
    color: 'amber',
    title: 'Resumed Beverage Processing',
    desc: 'Watched 60 mins · Sec 2',
    time: '2 days ago',
  },
  {
    icon: Star,
    color: 'tertiary',
    title: 'Earned — Food Safety Expert badge',
    desc: 'Top 5% of batch · Verified',
    time: '3 days ago',
  },
  {
    icon: BookOpen,
    color: 'primary',
    title: 'Enrolled — Dairy Processing Excellence',
    desc: 'Added to My Courses',
    time: '4 days ago',
  },
];
