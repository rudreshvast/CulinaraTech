import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, ExternalLink, CheckCircle2, Users, Info, Award, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { workshops } from '@/lib/data/workshops';
import { courses } from '@/data/courses';
import WorkshopDetailClient from './WorkshopDetailClient';

interface WorkshopDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return workshops.map((workshop) => ({
    slug: workshop.slug,
  }));
}

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { slug } = await params;
  const workshop = workshops.find((ws) => ws.slug === slug);

  if (!workshop) {
    notFound();
  }

  const relatedCourses = workshop.relatedCourses
    ? workshop.relatedCourses
        .map((courseSlug) => courses.find((c) => c.slug === courseSlug))
        .filter(Boolean)
    : [];

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      Certified: 'bg-blue-100 text-blue-800',
      'Closing Soon': 'bg-red-100 text-red-800',
      New: 'bg-green-100 text-green-800',
      'Govt. Certified': 'bg-purple-100 text-purple-800',
      Popular: 'bg-orange-100 text-orange-800',
      Hybrid: 'bg-amber-100 text-amber-800',
      'Limited Seats': 'bg-red-100 text-red-800',
    };
    return colors[badge] || 'bg-gray-100 text-gray-800';
  };

  const isClosingSoon = (deadline: string): boolean => {
    const now = new Date();
    const lastDate = new Date(deadline);
    const daysLeft = (lastDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  };

  return (
    <WorkshopDetailClient
      workshop={workshop}
      relatedCourses={relatedCourses}
      formatDate={formatDate}
      getBadgeColor={getBadgeColor}
      isClosingSoon={isClosingSoon}
    />
  );
}
