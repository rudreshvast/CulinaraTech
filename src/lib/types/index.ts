import { z } from 'zod';

// ──────────────────────────────────────────────────────────────────────────────
// Auth Types
// ──────────────────────────────────────────────────────────────────────────────

export type RoleName = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isVerified: boolean;
  roles: RoleName[];
  createdAt: string;
}

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

// ──────────────────────────────────────────────────────────────────────────────
// Course Types
// ──────────────────────────────────────────────────────────────────────────────

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
  totalDuration: number;
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
  videoUrl: string | null;
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

// ──────────────────────────────────────────────────────────────────────────────
// Enrollment Types
// ──────────────────────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────────────────
// Progress Types
// ──────────────────────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────────────────
// Review Types
// ──────────────────────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────────────────
// API Response Wrappers
// ──────────────────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
}

// ──────────────────────────────────────────────────────────────────────────────
// Instructor Types
// ──────────────────────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────────────────
// Internship Types
// ──────────────────────────────────────────────────────────────────────────────

export type InternshipCategory = 'Quality & Safety' | 'R&D' | 'Production' | 'Supply Chain' | 'Regulatory Affairs';
export type InternshipBadge = 'Urgent' | 'Hot' | 'New' | 'Closing Soon' | 'Popular';
export type LocationType = 'On-site' | 'Hybrid' | 'Remote';
export type Duration = '2 Months' | '3 Months' | '4 Months' | '6 Months';

// ──────────────────────────────────────────────────────────────────────────────
// Job Types
// ──────────────────────────────────────────────────────────────────────────────

export type JobCategory = 'Quality & Safety' | 'R&D' | 'Operations & Manufacturing' | 'Regulatory Affairs' | 'Production & Manufacturing' | 'Export & Trade';
export type JobBadge = 'Senior Role' | 'Actively Hiring' | 'Leadership Role' | 'Hybrid' | 'Niche Role' | 'Multiple Openings';
export type EmploymentType = 'Full-Time' | 'Contract' | 'Part-Time';
export type Experience = '0–3 Years' | '2–5 Years' | '3–6 Years' | '3–7 Years' | '8–12 Years' | '12–18 Years' | '12+ Years';

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  companyType: string;
  badge: JobBadge;
  category: JobCategory;
  department: string;
  postedDate: string;
  lastDate: string;
  featured: boolean;
  location: string;
  locationType: LocationType;
  employmentType: EmploymentType;
  experience: Experience;
  salary: string;
  salaryNegotiable: boolean;
  openings: number;
  industry: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  skills: string[];
  perks: string[];
  workSchedule: string;
  reportingTo: string;
  teamSize: string;
  travelRequired: string;
  aboutCompany: string;
  companySize: string;
  founded: string;
  headquarters: string;
  linkedinPage: string;
  applicationProcess: string[];
  expectedJoining: string;
  applyLink: string;
  applyEmail: string;
  referralBonus?: string;
  relatedCourses: string[];
  relatedInternships: string[];
}

export interface Internship {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  badge: InternshipBadge;
  category: InternshipCategory;
  department: string;
  postedDate: string;
  lastDate: string;
  featured: boolean;
  location: string;
  locationType: LocationType;
  duration: Duration;
  startDate: string;
  stipend: string;
  stipendNegotiable: boolean;
  openings: number;
  coverImage: string;
  overview: string;
  aboutCompany: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  skills: string[];
  perks: string[];
  applicationProcess: string[];
  applyLink: string;
  applyEmail: string;
  relatedCourses: string[];
}

// ──────────────────────────────────────────────────────────────────────────────
// Zod Schemas (for forms)
// ──────────────────────────────────────────────────────────────────────────────

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

// Inferred types from Zod schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
