import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  Dot,
  Gift,
  BookOpen,
  Bookmark,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { internships } from '@/lib/data/internships';
import { courses } from '@/data/courses';
import { ApplyModal } from '@/components/internships/ApplyModal';
import InternshipDetailClient from './InternshipDetailClient';

interface InternshipDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return internships.map((internship) => ({
    slug: internship.slug,
  }));
}

export default async function InternshipDetailPage({
  params,
}: InternshipDetailPageProps) {
  const { slug } = await params;
  const internship = internships.find((int) => int.slug === slug);

  if (!internship) {
    notFound();
  }

  const relatedCourses = internship.relatedCourses
    .map((courseSlug) => courses.find((c) => c.slug === courseSlug))
    .filter(Boolean);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isClosingSoon = (dateStr: string): boolean => {
    const now = new Date();
    const lastDate = new Date(dateStr);
    const daysLeft = (lastDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  };

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      Urgent: 'bg-destructive text-destructive-foreground',
      Hot: 'bg-orange-500 text-white',
      New: 'bg-green-500 text-white',
      'Closing Soon': 'bg-yellow-500 text-black',
      Popular: 'bg-blue-500 text-white',
    };
    return colors[badge] || 'bg-muted text-muted-foreground';
  };

  return (
    <InternshipDetailClient
      internship={internship}
      relatedCourses={relatedCourses}
      formatDate={formatDate}
      isClosingSoon={isClosingSoon}
      getBadgeColor={getBadgeColor}
    />
  );
}
