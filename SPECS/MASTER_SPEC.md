# Frontend Master Spec

## Implementation Order
Follow this sequence exactly — each step depends on the previous.

```
Phase 1 — Foundation
  1. Install dependencies
  2. Foundation setup (providers, API client, auth store, types, middleware)
  3. Layout & Navigation (Navbar, Footer, layouts)
  4. Auth pages (Login, Signup)

Phase 2 — Core UI
  5. Course Catalog (homepage, CourseCard, CourseGrid, filters)
  6. Course Detail page
  7. Student Dashboard
  8. Instructor Dashboard + Course Management
```

---

## Step 1 — Install Dependencies

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand
npm install axios
npm install react-hook-form @hookform/resolvers zod
npm install lucide-react
```

Verify shadcn is already set up (check `components/ui/` exists).

---

## Step 2 — Foundation Setup

Tell Claude Code:
```
Read CLAUDE.md, SPECS/MASTER_SPEC.md, and SPECS/shared/types.spec.md and SPECS/shared/api-client-hooks.spec.md.

First, audit the existing theme:
- Read tailwind.config.ts and src/app/globals.css
- List all CSS variables and color tokens defined
- Document them here so all future components use them

Then implement the foundation in this order:
1. src/lib/types/index.ts — all types and Zod schemas
2. src/lib/stores/auth.store.ts — Zustand store with persist
3. src/lib/api/client.ts — Axios instance with interceptors
4. src/lib/api/auth.api.ts
5. src/lib/api/courses.api.ts
6. src/lib/api/categories.api.ts
7. src/lib/api/enrollments.api.ts
8. src/lib/hooks/useAuth.ts
9. src/lib/hooks/useCourses.ts
10. src/lib/hooks/useEnrollments.ts
11. src/app/providers.tsx — QueryClientProvider + auth hydration
12. src/app/layout.tsx — wrap with Providers, add Toaster
13. src/middleware.ts — protect /dashboard, /learn, /instructor routes

Run npm run type-check when done.
```

---

## Step 3 — Layout & Navigation

```
Read CLAUDE.md and SPECS/features/02-layout-nav.spec.md.
Read tailwind.config.ts to understand the existing theme tokens before writing any styles.

Implement:
1. src/components/layout/Navbar.tsx
   - Logo, search bar, categories dropdown, auth state (guest vs logged in)
   - Mobile: Sheet/hamburger menu
   - Read categories from useCategoriesHook (create if not exists)
2. src/components/layout/Footer.tsx
3. src/app/(public)/layout.tsx
4. src/app/(protected)/layout.tsx
5. src/app/(public)/auth/layout.tsx — no nav/footer for auth pages

All colors must use theme tokens only (text-foreground, bg-background, etc.).
Run npm run type-check when done.
```

---

## Step 4 — Auth Pages

```
Read CLAUDE.md and SPECS/features/01-auth.spec.md.

Implement:
1. src/components/auth/LoginForm.tsx
   - React Hook Form + Zod loginSchema
   - Email + Password fields with show/hide toggle
   - Two-column layout (branding panel + form)
   - useLogin() hook, redirect to /dashboard on success
   - Error toast on failure

2. src/components/auth/SignupForm.tsx
   - React Hook Form + Zod registerSchema
   - Name + Email + Password + Role selector (card-style radio)
   - useRegister() hook

3. src/app/(public)/auth/login/page.tsx — renders LoginForm
4. src/app/(public)/auth/signup/page.tsx — renders SignupForm

Run npm run type-check when done.
```

---

## Step 5 — Course Catalog

```
Read CLAUDE.md and SPECS/features/03-course-catalog.spec.md.

Implement shared components first:
1. src/components/shared/StarRating.tsx
2. src/components/shared/PriceDisplay.tsx
3. src/components/shared/LoadingSpinner.tsx

Then catalog components:
4. src/components/courses/CourseCard.tsx
   - Thumbnail, title, instructor, rating, price
   - Hover overlay
   - Uses StarRating and PriceDisplay

5. src/components/courses/CourseGrid.tsx
   - Responsive grid
   - Skeleton loading (8 cards)
   - Empty state

6. src/components/courses/CourseFilters.tsx
   - Level and Sort filters
   - Desktop sidebar + mobile Sheet

7. src/app/(public)/page.tsx
   - Hero banner (hidden when search active)
   - Category pills (horizontal scroll)
   - Filters sidebar + CourseGrid
   - Pagination
   - URL-based state management

Run npm run type-check when done.
```

---

## Step 6 — Course Detail

```
Read CLAUDE.md and SPECS/features/04-course-detail.spec.md.

Implement:
1. src/components/courses/CourseCurriculum.tsx
   - Accordion sections with locked/preview lectures
2. src/components/courses/CourseHero.tsx
   - Dark/primary hero with course info
3. src/components/courses/CourseReviews.tsx
   - Rating distribution bars + review cards
4. src/app/(public)/courses/[id]/page.tsx
   - Compose all components
   - Sticky enrollment card (desktop) / bottom bar (mobile)
   - Enroll button logic (guest/free/paid/enrolled)

Run npm run type-check when done.
```

---

## Step 7 — Student Dashboard

```
Read CLAUDE.md and SPECS/features/05-student-dashboard.spec.md.

Implement:
1. src/components/dashboard/ProgressBar.tsx
2. src/components/dashboard/EnrolledCourseCard.tsx
3. src/app/(protected)/dashboard/page.tsx
   - Welcome header + stats cards
   - Tab filter (in-progress / completed / all)
   - Enrolled courses grid
   - Empty state

Run npm run type-check when done.
```

---

## Step 8 — Instructor Pages

```
Read CLAUDE.md and SPECS/features/06-instructor.spec.md.

Implement in this order:
1. src/app/(protected)/instructor/page.tsx — stats dashboard
2. src/app/(protected)/instructor/courses/page.tsx — courses table
3. src/app/(protected)/instructor/courses/new/page.tsx — create form
4. src/app/(protected)/instructor/courses/[id]/edit/page.tsx
   - Sidebar tabs (Course Info / Curriculum / Settings)
   - Course info form (pre-filled)
   - Curriculum manager (add/edit/delete sections and lectures)
   - Publish button with lecture count check

Run npm run type-check when done.
```

---

## Common Patterns

### URL State Pattern (catalog filters)
```typescript
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const router = useRouter();

// Read
const search = searchParams.get('search') ?? '';
const categoryId = searchParams.get('categoryId') ?? '';

// Write — replaces URL without navigation
const updateFilter = (key: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) params.set(key, value);
  else params.delete(key);
  router.push(`?${params.toString()}`, { scroll: false });
};
```

### Loading Skeleton Pattern
```typescript
// Always mirror the actual component's layout
if (isLoading) return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="aspect-video w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);
```

### Protected Page Pattern
```typescript
// middleware.ts handles redirect — no need to check in component
// But DO check roles for instructor-only pages:
'use client';
const { user } = useAuthStore();
if (user && !user.roles.includes('INSTRUCTOR')) redirect('/dashboard');
```

### Mutation with Toast
```typescript
const { mutate, isPending } = useCreateCourse();
const { toast } = useToast();

const onSubmit = (data: CreateCourseFormData) => {
  mutate(data, {
    onSuccess: (result) => {
      toast({ title: 'Course created!' });
      router.push(`/instructor/courses/${result.data.data.id}/edit`);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create course. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
```

---

## Claude Code Prompts — Quick Reference

### Fix a type error:
```
Run npm run type-check. Fix all TypeScript errors in src/components/courses/CourseCard.tsx.
Do not use 'any'. Check src/lib/types/index.ts for the correct types.
```

### Add a missing API hook:
```
Read SPECS/shared/api-client-hooks.spec.md.
Add useCategories() hook to src/lib/hooks/useCourses.ts that calls categoriesApi.getAll().
Follow the same pattern as useCourses().
```

### Fix theme violation:
```
Review src/components/courses/CourseCard.tsx.
Replace any hardcoded colors (text-gray-*, bg-blue-*, etc.) with theme tokens from tailwind.config.ts.
Only use: text-foreground, text-muted-foreground, bg-background, bg-card, bg-primary,
text-primary-foreground, bg-secondary, bg-muted, border, text-destructive.
```
