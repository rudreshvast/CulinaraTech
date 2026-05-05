'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useMyCourses } from '@/lib/hooks/useCourses';
import { Star, BookOpen, Users } from 'lucide-react';

export default function InstructorDashboardPage() {
  const { data: coursesData, isLoading } = useMyCourses();

  const courses = coursesData?.data?.data?.data || [];

  // Calculate stats
  const stats = useMemo(() => {
    const totalCourses = courses.length;
    const publishedCourses = courses.filter((c: any) => c.status === 'PUBLISHED');
    const totalStudents = courses.reduce((sum: number, c: any) => sum + (c.enrollmentCount || 0), 0);
    const avgRating =
      publishedCourses.length > 0
        ? (publishedCourses.reduce((sum: number, c: any) => sum + (c.averageRating || 0), 0) /
            publishedCourses.length).toFixed(1)
        : 0;

    return {
      totalCourses,
      publishedCourses: publishedCourses.length,
      totalStudents,
      avgRating,
    };
  }, [courses]);

  const recentCourses = courses.slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-32 mb-8" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your courses and track earnings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Courses</span>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalCourses}</p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Published</span>
              <Badge className="bg-secondary text-secondary-foreground">Live</Badge>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.publishedCourses}</p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Students</span>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.totalStudents.toLocaleString()}
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Avg Rating</span>
              <Star className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.avgRating} ★</p>
          </Card>
        </div>

        {/* Recent Courses */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Recent Courses</h2>

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCourses.length > 0 ? (
                  recentCourses.map((course: any) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium line-clamp-1 max-w-xs">
                        {course.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
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
                      </TableCell>
                      <TableCell>{course.enrollmentCount || 0}</TableCell>
                      <TableCell>{(course.averageRating || 0).toFixed(1)} ★</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/instructor/courses/${course.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No courses yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/instructor/courses">View All Courses →</Link>
            </Button>
            <Button asChild>
              <Link href="/instructor/courses/new">+ Create New Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
