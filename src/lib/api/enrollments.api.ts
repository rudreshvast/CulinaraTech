import apiClient from './client';
import type {
  Enrollment,
  EnrolledCourse,
  EnrollmentCheck,
  ApiResponse,
} from '../types';

export const enrollmentsApi = {
  getMyEnrollments: () =>
    apiClient.get<ApiResponse<EnrolledCourse[]>>('/enrollments/my'),

  checkEnrollment: (courseId: string) =>
    apiClient.get<ApiResponse<EnrollmentCheck>>(
      `/enrollments/check/${courseId}`
    ),

  enrollFree: (courseId: string) =>
    apiClient.post<ApiResponse<Enrollment>>('/enrollments/free', {
      courseId,
    }),

  initiatePayment: (courseId: string) =>
    apiClient.post<
      ApiResponse<{ paymentId: string; amount: number }>
    >('/payments/initiate', {
      courseId,
      provider: 'mock',
    }),

  confirmPayment: (paymentId: string, providerRef: string) =>
    apiClient.post<ApiResponse<Enrollment>>('/payments/confirm', {
      paymentId,
      providerRef,
    }),
};
