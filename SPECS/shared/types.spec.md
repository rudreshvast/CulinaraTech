# Shared Types & API Contracts

## File Location
`src/lib/types/index.ts`

> These types mirror the backend response DTOs exactly.
> Import from here everywhere — never redefine types locally.

---

## Auth Types

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isVerified: boolean;
  roles: RoleName[];
  createdAt: string;
}

export type RoleName = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: RoleName;
}

export interface LoginPayload {
  email: string;
  password: string;
}
```

---

## Course Types

```typescript
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Category {
  id: string;
  name: string;
}

export interface InstructorSummary {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface CourseListItem {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  price: number;
  level: CourseLevel;
  language: string;
  status: CourseStatus;
  totalDuration: number;       // seconds
  instructor: InstructorSummary;
  category: Category;
  averageRating: number;
  reviewCount: number;
  enrollmentCount: number;
  createdAt: string;
}

export interface LectureSummary {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  orderIndex: number;
  isPreview: boolean;
  videoUrl: string | null;     // null if not enrolled & not preview
}

export interface SectionWithLectures {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  lectures: LectureSummary[];
}

export interface CourseDetail extends CourseListItem {
  description: string;
  sections: SectionWithLectures[];
}

export interface CourseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  level?: CourseLevel;
  sort?: 'newest' | 'popular' | 'rated' | 'price_asc' | 'price_desc';
}
```

---

## Enrollment Types

```typescript
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  pricePaid: number;
  enrolledAt: string;
}

export interface EnrolledCourse {
  id: string;
  course: CourseListItem;
  pricePaid: number;
  enrolledAt: string;
}

export interface EnrollmentCheck {
  enrolled: boolean;
  enrollmentId: string | null;
}
```

---

## Progress Types

```typescript
export interface LectureProgress {
  lectureId: string;
  isCompleted: boolean;
  watchTime: number;
  lastWatchedAt: string | null;
}

export interface CourseProgress {
  courseId: string;
  totalLectures: number;
  completedLectures: number;
  completionPercentage: number;
  lectures: LectureProgress[];
}
```

---

## Review Types

```typescript
export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    name: string;
    avatarUrl: string | null;
  };
}

export interface ReviewsResponse {
  data: Review[];
  total: number;
  averageRating: number;
  ratingDistribution: Record<string, number>;
}
```

---

## Paginated Response Wrapper

```typescript
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// All API responses are wrapped in { data: T } by the TransformInterceptor
export interface ApiResponse<T> {
  data: T;
}
```

---

## Instructor Types

```typescript
export interface InstructorProfile {
  id: string;
  userId: string;
  bio: string | null;
  expertise: string | null;
  totalEarnings: number;
  user: {
    name: string;
    avatarUrl: string | null;
  };
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  level: CourseLevel;
  language?: string;
  categoryId: string;
}

export interface UpdateCoursePayload extends Partial<CreateCoursePayload> {}

export interface CreateSectionPayload {
  title: string;
  description?: string;
}

export interface CreateLecturePayload {
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  isPreview?: boolean;
}
```

---

## Zod Schemas (for forms)

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['STUDENT', 'INSTRUCTOR']).default('STUDENT'),
});

export const createCourseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(0, 'Price cannot be negative'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  language: z.string().default('English'),
  categoryId: z.string().uuid('Select a valid category'),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
```
