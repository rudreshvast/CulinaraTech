# API Client, Stores & Hooks

---

## 1. Axios Client
`src/lib/api/client.ts`

```typescript
// Singleton axios instance used by ALL api files
// Features:
// - baseURL from NEXT_PUBLIC_API_URL
// - Request interceptor: attach Authorization: Bearer <token> from auth store
// - Response interceptor:
//     on 401 → call POST /auth/refresh with refreshToken from store
//             → update store with new accessToken
//             → retry original request once
//             → if refresh fails → call authStore.logout() → redirect /auth/login
// - Never import this file in Server Components — only in 'use client' hooks/api files

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// attach token on every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// refresh token on 401
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );
        useAuthStore.getState().setTokens(data.data.accessToken, refreshToken);
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return apiClient(original);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 2. Auth Store
`src/lib/stores/auth.store.ts`

```typescript
// Zustand store with localStorage persistence
// Shape:
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

// Use zustand persist middleware — key: 'auth-storage'
// Persist: accessToken, refreshToken only (not isLoading)
// On hydration: if token exists, fetch /auth/me to validate and populate user
```

---

## 3. API Functions

### `src/lib/api/auth.api.ts`
```typescript
export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', payload),

  refresh: (refreshToken: string) =>
    apiClient.post<{ data: { accessToken: string } }>('/auth/refresh', { refreshToken }),

  logout: () =>
    apiClient.post('/auth/logout'),

  me: () =>
    apiClient.get<ApiResponse<User>>('/auth/me'),
};
```

### `src/lib/api/courses.api.ts`
```typescript
export const coursesApi = {
  getAll: (params: CourseQueryParams) =>
    apiClient.get<ApiResponse<PaginatedResponse<CourseListItem>>>('/courses', { params }),

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

  delete: (id: string) =>
    apiClient.delete(`/courses/${id}`),

  // Sections
  createSection: (courseId: string, payload: CreateSectionPayload) =>
    apiClient.post(`/courses/${courseId}/sections`, payload),

  updateSection: (courseId: string, sectionId: string, payload: Partial<CreateSectionPayload>) =>
    apiClient.patch(`/courses/${courseId}/sections/${sectionId}`, payload),

  deleteSection: (courseId: string, sectionId: string) =>
    apiClient.delete(`/courses/${courseId}/sections/${sectionId}`),

  reorderSections: (courseId: string, sectionIds: string[]) =>
    apiClient.patch(`/courses/${courseId}/sections/reorder`, { sectionIds }),

  // Lectures
  createLecture: (courseId: string, sectionId: string, payload: CreateLecturePayload) =>
    apiClient.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload),

  updateLecture: (courseId: string, sectionId: string, lectureId: string, payload: Partial<CreateLecturePayload>) =>
    apiClient.patch(`/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`, payload),

  deleteLecture: (courseId: string, sectionId: string, lectureId: string) =>
    apiClient.delete(`/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`),
};
```

### `src/lib/api/categories.api.ts`
```typescript
export const categoriesApi = {
  getAll: () =>
    apiClient.get<ApiResponse<Category[]>>('/categories'),
};
```

### `src/lib/api/enrollments.api.ts`
```typescript
export const enrollmentsApi = {
  getMyEnrollments: () =>
    apiClient.get<ApiResponse<EnrolledCourse[]>>('/enrollments/my'),

  checkEnrollment: (courseId: string) =>
    apiClient.get<ApiResponse<EnrollmentCheck>>(`/enrollments/check/${courseId}`),

  enrollFree: (courseId: string) =>
    apiClient.post<ApiResponse<Enrollment>>('/enrollments/free', { courseId }),

  initiatePayment: (courseId: string) =>
    apiClient.post<ApiResponse<{ paymentId: string; amount: number }>>('/payments/initiate', {
      courseId,
      provider: 'mock',
    }),

  confirmPayment: (paymentId: string, providerRef: string) =>
    apiClient.post<ApiResponse<Enrollment>>('/payments/confirm', { paymentId, providerRef }),
};
```

---

## 4. TanStack Query Hooks

### `src/lib/hooks/useCourses.ts`
```typescript
// Query keys — always define as constants
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: CourseQueryParams) => [...courseKeys.lists(), params] as const,
  detail: (id: string) => [...courseKeys.all, 'detail', id] as const,
  my: () => [...courseKeys.all, 'my'] as const,
};

// Hooks to implement:
export function useCourses(params: CourseQueryParams)    // useQuery → coursesApi.getAll
export function useCourse(id: string)                    // useQuery → coursesApi.getById
export function useMyCourses()                           // useQuery → coursesApi.getMyCourses
export function useCreateCourse()                        // useMutation → coursesApi.create
export function useUpdateCourse()                        // useMutation → coursesApi.update
export function usePublishCourse()                       // useMutation → coursesApi.publish
export function useDeleteCourse()                        // useMutation → coursesApi.delete
```

### `src/lib/hooks/useAuth.ts`
```typescript
// Hooks to implement:
export function useLogin()        // useMutation → authApi.login → setAuth in store
export function useRegister()     // useMutation → authApi.register → setAuth in store
export function useLogout()       // useMutation → authApi.logout → store.logout()
export function useMe()           // useQuery → authApi.me (enabled: isAuthenticated)
```

### `src/lib/hooks/useEnrollments.ts`
```typescript
export function useMyEnrollments()          // useQuery
export function useEnrollmentCheck(courseId: string)  // useQuery
export function useEnrollFree()             // useMutation
export function useInitiatePayment()        // useMutation
export function useConfirmPayment()         // useMutation
```

---

## 5. TanStack Query Provider Setup
`src/app/providers.tsx` — wrap with QueryClientProvider + AuthHydration

```typescript
'use client';
// QueryClient with defaults:
// staleTime: 1000 * 60 * 5  (5 minutes)
// retry: 1
// refetchOnWindowFocus: false
```

---

## 6. Middleware
`src/middleware.ts`

```typescript
// Protect these paths — redirect to /auth/login if no token:
// /dashboard, /learn/:path*, /instructor/:path*
// Read token from cookie OR Authorization header
// Allow all other paths
```

## Notes for Claude Code
- Install dependencies first: `npm install @tanstack/react-query zustand axios react-hook-form @hookform/resolvers zod`
- TanStack Query DevTools in dev only
- Zustand store must use `persist` middleware from `zustand/middleware`
- All hooks must be in `'use client'` files
