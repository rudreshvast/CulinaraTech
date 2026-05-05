'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { useCreateCourse, useCategories } from '@/lib/hooks/useCourses';
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

export default function CreateCoursePage() {
  const router = useRouter();
  const { error: errorToast, success: successToast } = useToast();
  const { mutate: createCourse, isPending } = useCreateCourse();
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
      title: '',
      description: '',
      price: 0,
      level: 'BEGINNER',
      language: 'English',
      categoryId: '',
      thumbnailUrl: '',
    },
  });

  const thumbnailUrlValue = watch('thumbnailUrl');

  const onSubmit = (data: CourseFormData) => {
    createCourse(data as any, {
      onSuccess: (response) => {
        successToast('Success', 'Course created successfully');
        const courseId = response.data?.data?.id;
        if (courseId) {
          router.push(`/instructor/courses/${courseId}/edit`);
        } else {
          router.push('/instructor/courses');
        }
      },
      onError: (error: any) => {
        errorToast('Error', error.response?.data?.message || 'Failed to create course');
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create a New Course</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the basic information about your course
          </p>
        </div>

        {/* Back Link */}
        <Button asChild variant="outline" className="w-fit">
          <Link href="/instructor/courses">← Back to My Courses</Link>
        </Button>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Course Title <span className="text-destructive">*</span>
              </label>
              <Input
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., Advanced React Patterns"
                className="w-full"
              />
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
                {...register('description', { required: 'Description is required' })}
                placeholder="Describe what students will learn in this course"
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
                        <SelectValue placeholder="Select a category" />
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
                <p className="text-xs text-muted-foreground">Enter 0 for free course</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Language</label>
                <Input
                  {...register('language')}
                  placeholder="English"
                />
              </div>
            </div>

            {/* Thumbnail URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Thumbnail URL</label>
              <Input
                {...register('thumbnailUrl')}
                placeholder="https://example.com/image.jpg"
              />

              {/* Preview */}
              {thumbnailUrlValue && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Preview:</p>
                  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={thumbnailUrlValue}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                      onError={() => {
                        // Error loading image
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Button asChild variant="outline">
                <Link href="/instructor/courses">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? 'Creating...' : 'Create Course →'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
