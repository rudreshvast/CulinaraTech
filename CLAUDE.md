# Udemy Clone — Next.js Frontend

## 🎯 Project Purpose
Course marketplace UI. Students browse, purchase and watch courses.
Instructors manage their courses. Built on an existing design system.

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + existing theme in tailwind.config.ts
- **Components**: shadcn/ui (already installed)
- **State**: Zustand for global state (auth, cart)
- **Server State**: TanStack Query (React Query) for all API calls
- **HTTP**: Axios via a central API client
- **Forms**: React Hook Form + Zod validation
- **Icons**: lucide-react

## 🚨 THEME RULES — CRITICAL
- NEVER use hardcoded colors like `text-gray-600` or `bg-blue-500`
- ALWAYS use theme tokens: `text-foreground`, `bg-background`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `bg-card`, `border`, `bg-secondary`, `bg-destructive`, `bg-muted`
- Read the existing theme from `tailwind.config.ts` and `globals.css` BEFORE writing any component
- Use shadcn/ui components as the base — never rebuild what shadcn already provides
- Respect existing CSS variables defined in globals.css

## 📁 Project Structure (follow exactly)
```
src/
├── app/
│   ├── layout.tsx               # root layout with providers
│   ├── globals.css              # existing theme (DO NOT MODIFY)
│   ├── (public)/                # unauthenticated routes
│   │   ├── page.tsx             # homepage / course catalog
│   │   ├── courses/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # course detail
│   │   └── auth/
│   │       ├── login/page.tsx
│   │       └── signup/page.tsx
│   ├── (protected)/             # requires auth
│   │   ├── dashboard/page.tsx   # student dashboard
│   │   ├── learn/
│   │   │   └── [courseId]/page.tsx  # video player
│   │   └── instructor/
│   │       ├── page.tsx             # instructor dashboard
│   │       └── courses/
│   │           ├── page.tsx         # my courses list
│   │           ├── new/page.tsx     # create course
│   │           └── [id]/
│   │               └── edit/page.tsx
│   └── api/                     # Next.js API routes (if needed)
├── components/
│   ├── ui/                      # shadcn components (DO NOT MODIFY)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── courses/
│   │   ├── CourseCard.tsx
│   │   ├── CourseGrid.tsx
│   │   ├── CourseFilters.tsx
│   │   ├── CourseHero.tsx
│   │   └── CourseReviews.tsx
│   ├── player/
│   │   └── VideoPlayer.tsx
│   ├── dashboard/
│   │   ├── EnrolledCourseCard.tsx
│   │   └── ProgressBar.tsx
│   └── shared/
│       ├── StarRating.tsx
│       ├── PriceDisplay.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts            # axios instance with interceptors
│   │   ├── auth.api.ts
│   │   ├── courses.api.ts
│   │   ├── enrollments.api.ts
│   │   └── categories.api.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCourses.ts
│   │   └── useEnrollments.ts
│   ├── stores/
│   │   ├── auth.store.ts        # Zustand auth store
│   │   └── cart.store.ts
│   ├── types/
│   │   └── index.ts             # all shared TypeScript types
│   └── utils/
│       └── index.ts
└── middleware.ts                # route protection
```

## ⚙️ Code Conventions (CRITICAL)
1. **No hardcoded colors** — theme tokens only
2. **API calls via lib/api/** — never fetch() directly in components
3. **TanStack Query for all server state** — useQuery, useMutation
4. **Zustand for client state** — auth token, user info
5. **Always handle 3 states** — loading skeleton, error state, success
6. **No `any` type** — strict TypeScript
7. **Forms use React Hook Form + Zod** — never uncontrolled inputs
8. **Protected pages check auth in middleware.ts** — not in components
9. **shadcn/ui first** — use Button, Input, Card, Badge, Dialog from shadcn before building custom
10. **Server Components by default** — add `'use client'` only when needed (hooks, events, browser APIs)

## 🌐 API Configuration
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```
All API calls go through `src/lib/api/client.ts` which:
- Sets baseURL from env
- Attaches JWT token from localStorage/store to every request
- On 401 response → calls refresh token endpoint → retries original request
- On refresh failure → clears auth state → redirects to /auth/login

## 🔐 Auth Flow
- JWT stored in Zustand store (persisted to localStorage via zustand/middleware persist)
- middleware.ts reads token and protects /dashboard, /learn, /instructor routes
- On app load → validate token → fetch /auth/me → populate auth store

## 🏗 Implementation Order per Feature
1. Types (add to lib/types/index.ts)
2. API function (lib/api/<module>.api.ts)
3. TanStack Query hook (lib/hooks/)
4. Components (components/<feature>/)
5. Page (app/...)

## Running
```bash
npm run dev        # dev server port 3000
npm run type-check # tsc --noEmit
npm run build      # production build
```
