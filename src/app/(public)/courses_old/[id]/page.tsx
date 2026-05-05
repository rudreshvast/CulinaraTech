'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { CourseHero } from '@/components/courses/CourseHero';
import { CourseCurriculum } from '@/components/courses/CourseCurriculum';
import { CourseReviews } from '@/components/courses/CourseReviews';
import { EnrollmentCard } from '@/components/courses/EnrollmentCard';
import { useCourse } from '@/lib/hooks/useCourses';

export default function CourseDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: courseData, isLoading } = useCourse(id);

  const course = courseData?.data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero skeleton */}
        <div className="bg-primary h-64 md:h-80" />

        {/* Content skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-64" />
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 sticky top-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Course not found</h1>
          <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const lectureCount = course.sections.reduce((sum, s) => sum + s.lectures.length, 0);

  // Mock reviews data - replace with actual API data
  const mockReviews = [
    {
      id: '1',
      userId: '1',
      courseId: course.id,
      rating: 5,
      comment: 'Excellent course! Very informative and well-structured.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'John Doe',
        avatarUrl: null,
      },
    },
  ];

  const mockRatingDistribution = {
    '5': 65,
    '4': 20,
    '3': 10,
    '2': 3,
    '1': 2,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <CourseHero course={course} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Master core concepts and fundamentals',
                  'Build real-world projects from scratch',
                  'Understand best practices and patterns',
                  'Solve complex problems efficiently',
                  'Collaborate with other learners',
                  'Get certified upon completion',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-0.5">✓</span>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Requirements</h2>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Basic understanding of programming concepts</li>
                <li>A computer with internet connection</li>
                <li>Willingness to learn and practice</li>
              </ul>
            </section>

            {/* Curriculum */}
            <section>
              <CourseCurriculum sections={course.sections} />
            </section>

            {/* Reviews */}
            <section>
              <CourseReviews
                reviews={mockReviews}
                averageRating={course.averageRating}
                ratingDistribution={mockRatingDistribution}
                totalReviews={course.reviewCount}
              />
            </section>

            {/* Instructor */}
            <section className="space-y-4 border-t border-border pt-8">
              <h2 className="text-2xl font-bold text-foreground">About the instructor</h2>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center text-3xl">
                  {course.instructor.name.charAt(0)}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {course.instructor.name}
                  </h3>
                  <p className="text-muted-foreground">
                    Expert instructor with years of experience in this field. Passionate about sharing knowledge
                    and helping students succeed in their learning journey.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EnrollmentCard
                course={course}
                thumbnail={course.thumbnailUrl}
                sectionCount={course.sections.length}
                lectureCount={lectureCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
