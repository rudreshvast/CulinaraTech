'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCourse } from '@/lib/hooks/useCourses';
import { CourseInfoTab } from '@/components/instructor/CourseInfoTab';
import { CurriculumTab } from '@/components/instructor/CurriculumTab';
import { SettingsTab } from '@/components/instructor/SettingsTab';

export default function EditCoursePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: courseData, isLoading, refetch } = useCourse(id);
  const [activeTab, setActiveTab] = useState('info');

  const course = courseData?.data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-16 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96 lg:col-span-1" />
            <Skeleton className="h-96 lg:col-span-3" />
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
          <Button asChild>
            <Link href="/instructor/courses">Back to My Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
            <p className="text-muted-foreground mt-2">Edit course details and content</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/instructor/courses">← Back</Link>
          </Button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-6 space-y-6 sticky top-24">
              {/* Status */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge
                  className={
                    course.status === 'PUBLISHED'
                      ? 'bg-secondary text-secondary-foreground'
                      : course.status === 'DRAFT'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-destructive/10 text-destructive'
                  }
                >
                  {course.status}
                </Badge>
              </div>

              {/* Publish Button */}
              <div className="border-t border-border pt-6">
                <Button
                  className="w-full"
                  disabled={course.sections?.some((s: any) => (s.lectures?.length || 0) > 0) === false}
                >
                  {course.status === 'PUBLISHED' ? 'Already Published' : 'Publish Course'}
                </Button>
                {!course.sections?.some((s: any) => (s.lectures?.length || 0) > 0) && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Add at least one lecture before publishing
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="border-t border-border pt-6 space-y-3">
                <div className="text-xs">
                  <p className="text-muted-foreground">Students</p>
                  <p className="font-bold text-foreground">{course.enrollmentCount || 0}</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-bold text-foreground">{(course.averageRating || 0).toFixed(1)} ★</p>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Course Info</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Course Info Tab */}
              <TabsContent value="info">
                <CourseInfoTab course={course} onSuccess={refetch} />
              </TabsContent>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum">
                <CurriculumTab course={course} onSuccess={refetch} />
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <SettingsTab course={course} onSuccess={refetch} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
