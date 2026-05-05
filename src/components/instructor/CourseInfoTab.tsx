'use client';

import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useUpdateCourse, useCategories } from '@/lib/hooks/useCourses';
import { Loader2 } from 'lucide-react';

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language: string;
  categoryId: string;
  thumbnailUrl?: string;
}

interface CourseInfoTabProps {
  course: any;
  onSuccess: () => void;
}

export function CourseInfoTab({ course, onSuccess }: CourseInfoTabProps) {
  const { error: errorToast, success: successToast } = useToast();
  const { mutate: updateCourse, isPending } = useUpdateCourse();
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data?.data || [];
  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CourseFormData>({
    defaultValues: {
      title: course.title,
      description: course.description,
      price: course.price,
      level: course.level,
      language: course.language || 'English',
      categoryId: course.category.id,
      thumbnailUrl: course.thumbnailUrl || '',
    },
  });

  const onSubmit = (data: CourseFormData) => {
    updateCourse(
      { id: course.id, payload: data },
      {
        onSuccess: () => {
          successToast('Success', 'Course updated successfully');
          onSuccess();
        },
        onError: (error: any) => {
          errorToast('Error', error.response?.data?.message || 'Failed to update course');
        },
      }
    );
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Course Title <span className="text-destructive">*</span>
          </label>
          <Input {...register('title')} placeholder="Course title" className="w-full" />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <Textarea
            {...register('description')}
            placeholder="Course description"
            rows={5}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Category & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Category <span className="text-destructive">*</span>
            </label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <p className="text-xs text-destructive">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Level <span className="text-destructive">*</span>
            </label>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Price & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Price (₹) <span className="text-destructive">*</span>
            </label>
            <Input
              {...register('price', { valueAsNumber: true })}
              type="number"
              placeholder="0"
              min="0"
              step="100"
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Language</label>
            <Input {...register('language')} placeholder="English" />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Thumbnail URL</label>
          <Input
            {...register('thumbnailUrl')}
            placeholder="https://example.com/image.jpg"
          />
          {errors.thumbnailUrl && (
            <p className="text-xs text-destructive">{errors.thumbnailUrl.message}</p>
          )}

          {(() => {
            const thumbnailUrl = watch('thumbnailUrl');
            return thumbnailUrl ? (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">Preview:</p>
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-6 border-t border-border">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
