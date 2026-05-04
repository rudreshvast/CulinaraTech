'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { enrollmentsApi } from '../api/enrollments.api';

export const enrollmentKeys = {
  all: ['enrollments'] as const,
  my: () => [...enrollmentKeys.all, 'my'] as const,
  check: (courseId: string) => [...enrollmentKeys.all, 'check', courseId] as const,
};

export function useMyEnrollments() {
  return useQuery({
    queryKey: enrollmentKeys.my(),
    queryFn: () => enrollmentsApi.getMyEnrollments(),
  });
}

export function useEnrollmentCheck(courseId: string) {
  return useQuery({
    queryKey: enrollmentKeys.check(courseId),
    queryFn: () => enrollmentsApi.checkEnrollment(courseId),
  });
}

export function useEnrollFree() {
  return useMutation({
    mutationFn: (courseId: string) => enrollmentsApi.enrollFree(courseId),
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (courseId: string) => enrollmentsApi.initiatePayment(courseId),
  });
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: ({ paymentId, providerRef }: { paymentId: string; providerRef: string }) =>
      enrollmentsApi.confirmPayment(paymentId, providerRef),
  });
}
