'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { useDeleteCourse } from '@/lib/hooks/useCourses';

interface SettingsTabProps {
  course: any;
  onSuccess: () => void;
}

export function SettingsTab({ course, onSuccess }: SettingsTabProps) {
  const router = useRouter();
  const { error: errorToast, success: successToast } = useToast();
  const { mutate: deleteCourse, isPending } = useDeleteCourse();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = () => {
    deleteCourse(course.id, {
      onSuccess: () => {
        successToast('Success', 'Course deleted successfully');
        router.push('/instructor/courses');
      },
      onError: (error: any) => {
        errorToast('Error', error.response?.data?.message || 'Failed to delete course');
      },
    });
  };

  const canDelete = course.status === 'DRAFT';

  return (
    <Card className="p-8">
      <div className="space-y-8">
        {/* Danger Zone */}
        <div className="border-l-4 border-destructive bg-destructive/5 p-6 rounded space-y-4">
          <div>
            <h4 className="font-semibold text-destructive">Danger Zone</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Irreversible actions that will permanently affect your course
            </p>
          </div>

          {canDelete && (
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                Delete this draft course. This action cannot be undone.
              </p>
              <Button
                variant="destructive"
                onClick={() => setShowAlert(true)}
                disabled={isPending}
              >
                Delete Course
              </Button>
            </div>
          )}

          {!canDelete && (
            <div className="text-sm text-muted-foreground">
              <p>Published courses cannot be deleted directly. Archive the course first.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{course.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
