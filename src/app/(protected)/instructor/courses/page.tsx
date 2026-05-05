'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useMyCourses, useDeleteCourse, usePublishCourse } from '@/lib/hooks/useCourses';
import { Edit, Trash2, Share2 } from 'lucide-react';

export default function MyCoursesPage() {
  const { data: coursesData, isLoading, refetch } = useMyCourses();
  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: publishCourse } = usePublishCourse();
  const { error: errorToast, success: successToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [alertConfig, setAlertConfig] = useState<{
    type: 'delete' | 'publish' | null;
    courseId?: string;
    courseName?: string;
  }>({ type: null });

  const courses = coursesData?.data?.data?.data || [];

  const filteredCourses = courses.filter((course: any) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteConfirm = () => {
    if (alertConfig.courseId) {
      deleteCourse(alertConfig.courseId, {
        onSuccess: () => {
          successToast('Success', 'Course deleted successfully');
          refetch();
          setAlertConfig({ type: null });
        },
        onError: (error: any) => {
          errorToast('Error', error.response?.data?.message || 'Failed to delete course');
        },
      });
    }
  };

  const handlePublishConfirm = () => {
    if (alertConfig.courseId) {
      publishCourse(alertConfig.courseId, {
        onSuccess: () => {
          successToast('Success', 'Course published successfully');
          refetch();
          setAlertConfig({ type: null });
        },
        onError: (error: any) => {
          errorToast('Error', error.response?.data?.message || 'Failed to publish course');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-16 mb-8" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <Button asChild>
            <Link href="/instructor/courses/new">+ Create New Course</Link>
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {/* Courses Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course: any) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      {course.thumbnailUrl ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden">
                          <Image
                            src={course.thumbnailUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          No img
                        </div>
                      )}
                    </TableCell>
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
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="inline-flex"
                      >
                        <Link href={`/instructor/courses/${course.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {course.status === 'DRAFT' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setAlertConfig({
                              type: 'publish',
                              courseId: course.id,
                              courseName: course.title,
                            })
                          }
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      )}
                      {course.status === 'DRAFT' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() =>
                            setAlertConfig({
                              type: 'delete',
                              courseId: course.id,
                              courseName: course.title,
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {courses.length === 0
                      ? 'No courses yet. Create your first course!'
                      : 'No courses match your search'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Alert Dialogs */}
      <AlertDialog open={alertConfig.type !== null}>
        <AlertDialogContent>
          {alertConfig.type === 'delete' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Course</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{alertConfig.courseName}"? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-3">
                <AlertDialogCancel
                  onClick={() => setAlertConfig({ type: null })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </div>
            </>
          )}

          {alertConfig.type === 'publish' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish Course</AlertDialogTitle>
                <AlertDialogDescription>
                  Publishing "{alertConfig.courseName}" will make it visible to students. Make
                  sure you have added at least one lecture.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-3">
                <AlertDialogCancel
                  onClick={() => setAlertConfig({ type: null })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handlePublishConfirm}>
                  Publish Course
                </AlertDialogAction>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
