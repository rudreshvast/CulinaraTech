import { notFound } from 'next/navigation';
import { industrialVisits } from '@/lib/data/industrial-visits';
import { courses } from '@/data/courses';
import VisitDetailClient from './VisitDetailClient';

interface VisitDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industrialVisits.map((visit) => ({
    slug: visit.slug,
  }));
}

export default async function VisitDetailPage({ params }: VisitDetailPageProps) {
  const { slug } = await params;
  const visit = industrialVisits.find((v) => v.slug === slug);

  if (!visit) {
    notFound();
  }

  const relatedCourses = visit.relatedCourses
    ? visit.relatedCourses
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

  const isClosingSoon = (deadline: string): boolean => {
    const now = new Date();
    const lastDate = new Date(deadline);
    const daysLeft = (lastDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  };

  return (
    <VisitDetailClient
      visit={visit}
      relatedCourses={relatedCourses}
      formatDate={formatDate}
      isClosingSoon={isClosingSoon}
    />
  );
}
