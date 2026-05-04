import apiClient from './client';
import type {
  CourseListItem,
  CourseDetail,
  CourseQueryParams,
  CreateCoursePayload,
  UpdateCoursePayload,
  CreateSectionPayload,
  CreateLecturePayload,
  PaginatedResponse,
  ApiResponse,
} from '../types';

export const coursesApi = {
  getAll: (params: CourseQueryParams) =>
    apiClient.get<ApiResponse<PaginatedResponse<CourseListItem>>>('/courses', {
      params,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<CourseDetail>>(`/courses/${id}`),

  getMyCourses: () =>
    apiClient.get<ApiResponse<PaginatedResponse<CourseListItem>>>('/courses/my'),

  create: (payload: CreateCoursePayload) =>
    apiClient.post<ApiResponse<CourseDetail>>('/courses', payload),

  update: (id: string, payload: UpdateCoursePayload) =>
    apiClient.patch<ApiResponse<CourseDetail>>(`/courses/${id}`, payload),

  publish: (id: string) =>
    apiClient.post<ApiResponse<CourseDetail>>(`/courses/${id}/publish`),

  archive: (id: string) =>
    apiClient.post<ApiResponse<CourseDetail>>(`/courses/${id}/archive`),

  delete: (id: string) => apiClient.delete(`/courses/${id}`),

  // Sections
  createSection: (courseId: string, payload: CreateSectionPayload) =>
    apiClient.post(`/courses/${courseId}/sections`, payload),

  updateSection: (
    courseId: string,
    sectionId: string,
    payload: Partial<CreateSectionPayload>
  ) =>
    apiClient.patch(
      `/courses/${courseId}/sections/${sectionId}`,
      payload
    ),

  deleteSection: (courseId: string, sectionId: string) =>
    apiClient.delete(`/courses/${courseId}/sections/${sectionId}`),

  reorderSections: (courseId: string, sectionIds: string[]) =>
    apiClient.patch(`/courses/${courseId}/sections/reorder`, { sectionIds }),

  // Lectures
  createLecture: (
    courseId: string,
    sectionId: string,
    payload: CreateLecturePayload
  ) =>
    apiClient.post(
      `/courses/${courseId}/sections/${sectionId}/lectures`,
      payload
    ),

  updateLecture: (
    courseId: string,
    sectionId: string,
    lectureId: string,
    payload: Partial<CreateLecturePayload>
  ) =>
    apiClient.patch(
      `/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`,
      payload
    ),

  deleteLecture: (
    courseId: string,
    sectionId: string,
    lectureId: string
  ) =>
    apiClient.delete(
      `/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`
    ),
};
