'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { coursesApi } from '../api/courses.api';
import { categoriesApi } from '../api/categories.api';
import type {
  CourseQueryParams,
  CreateCoursePayload,
  UpdateCoursePayload,
  CreateSectionPayload,
  CreateLecturePayload,
} from '../types';

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: CourseQueryParams) => [...courseKeys.lists(), params] as const,
  detail: (id: string) => [...courseKeys.all, 'detail', id] as const,
  my: () => [...courseKeys.all, 'my'] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
};

export function useCourses(params: CourseQueryParams) {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => coursesApi.getAll(params),
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => coursesApi.getById(id),
  });
}

export function useMyCourses() {
  return useQuery({
    queryKey: courseKeys.my(),
    queryFn: () => coursesApi.getMyCourses(),
  });
}

export function useCreateCourse() {
  return useMutation({
    mutationFn: (payload: CreateCoursePayload) => coursesApi.create(payload),
  });
}

export function useUpdateCourse() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCoursePayload }) =>
      coursesApi.update(id, payload),
  });
}

export function usePublishCourse() {
  return useMutation({
    mutationFn: (id: string) => coursesApi.publish(id),
  });
}

export function useDeleteCourse() {
  return useMutation({
    mutationFn: (id: string) => coursesApi.delete(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoriesApi.getAll(),
  });
}

// Section Mutations
export function useCreateSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, payload }: { courseId: string; payload: CreateSectionPayload }) =>
      coursesApi.createSection(courseId, payload),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) });
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      sectionId,
      payload,
    }: {
      courseId: string;
      sectionId: string;
      payload: Partial<CreateSectionPayload>;
    }) => coursesApi.updateSection(courseId, sectionId, payload),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) });
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, sectionId }: { courseId: string; sectionId: string }) =>
      coursesApi.deleteSection(courseId, sectionId),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) });
    },
  });
}

// Lecture Mutations
export function useCreateLecture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      sectionId,
      payload,
    }: {
      courseId: string;
      sectionId: string;
      payload: CreateLecturePayload;
    }) => coursesApi.createLecture(courseId, sectionId, payload),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) });
    },
  });
}

export function useUpdateLecture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      sectionId,
      lectureId,
      payload,
    }: {
      courseId: string;
      sectionId: string;
      lectureId: string;
      payload: Partial<CreateLecturePayload>;
    }) => coursesApi.updateLecture(courseId, sectionId, lectureId, payload),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) });
    },
  });
}

export function useDeleteLecture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      sectionId,
      lectureId,
    }: {
      courseId: string;
      sectionId: string;
      lectureId: string;
    }) => coursesApi.deleteLecture(courseId, sectionId, lectureId),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) });
    },
  });
}
