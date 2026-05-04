# Feature Spec: Course Detail Page (Phase 2)

## Page
`src/app/(public)/courses/[slug]/page.tsx`

> Note: Backend returns courses by `id`. Use `id` as the route param.
> Route: `/courses/[id]`

## Components
- `src/components/courses/CourseHero.tsx`
- `src/components/courses/CourseReviews.tsx`
- `src/components/courses/CourseCurriculum.tsx` (new)
- `src/components/shared/StarRating.tsx`

---

## Page Layout

```
┌─────────────────────────────────────────────────────┐
│  HERO (bg-primary or dark bg)                       │
│  Breadcrumb: Home > Category > Course               │
│  Title (h1, large)                                  │
│  Short description (2-3 lines)                      │
│  Rating  ·  Students  ·  Duration  ·  Level         │
│  By [Instructor name]   Last updated [date]         │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────┐  ┌────────────────────┐
│  WHAT YOU'LL LEARN          │  │  STICKY CARD       │
│  (2-column checklist)       │  │  [Thumbnail]       │
│                             │  │  Price             │
│  REQUIREMENTS               │  │  [Enroll Button]   │
│                             │  │  ─────────────     │
│  COURSE CURRICULUM          │  │  ✓ X lectures      │
│  Accordion sections with    │  │  ✓ Duration        │
│  locked/preview lectures    │  │  ✓ Full lifetime   │
│                             │  │  ✓ Certificate     │
│  REVIEWS                    │  └────────────────────┘
│  Rating distribution        │
│  Review cards               │
│                             │
│  INSTRUCTOR INFO            │
└─────────────────────────────┘
```

---

## Hero Section (`CourseHero` component)
- `bg-primary` or dark background with `text-primary-foreground`
- Breadcrumb using shadcn `<Breadcrumb>` or simple links
- Course title: `text-3xl font-bold`
- Short description: first 150 chars of description
- Stats row: Star rating + count · `{enrollmentCount} students` · `{totalDuration} hours` · level badge
- Instructor: "Created by [name]" as clickable link
- Language badge

---

## Sticky Enrollment Card (desktop right sidebar / mobile bottom bar)

### Desktop: `sticky top-24` right column (w-80)
### Mobile: fixed bottom bar with price + "Enroll" button

```
[Course Thumbnail - 16:9]
Price: ₹999 (bold, large)

[Enroll Now / Go to Course Button]  ← full width, primary
[Add to Wishlist]  ← outline button

This course includes:
  ✓ {lectures} lectures
  ✓ {formatDuration(totalDuration)} of video
  ✓ Full lifetime access
  ✓ Certificate of completion
```

### Enroll Button Logic
```typescript
// States:
// 1. Not authenticated → "Sign up to enroll" → navigate /auth/signup
// 2. Authenticated + not enrolled + price = 0 → "Enroll for Free" → useEnrollFree()
// 3. Authenticated + not enrolled + price > 0 → "Buy Now ₹{price}" → useInitiatePayment()
// 4. Already enrolled → "Go to Course" → navigate /learn/{courseId}
// Loading state on all mutations
```

---

## Curriculum Section (`CourseCurriculum` component)

```
Course content
X sections • Y lectures • Z total hours

[Expand all]

▼ Section 1: Getting Started    (3 lectures • 45 min)
  ▶ 01. Introduction            12:34   [FREE PREVIEW]
  🔒 02. Setting Up Environment  8:20
  🔒 03. Your First Component    15:10

▶ Section 2: Core Concepts      (5 lectures • 1h 20min)
  (collapsed)
```

- shadcn `<Accordion>` for sections
- First section expanded by default
- Lecture row: Play icon if preview, Lock icon if locked
- `[FREE PREVIEW]` badge on `isPreview = true` lectures
- Click on preview lecture → open video modal (or navigate)
- Locked lectures: `text-muted-foreground` + cursor not allowed

---

## Reviews Section (`CourseReviews` component)

```
Student reviews
★★★★½  4.5 overall rating

  ████████████  5 ★ (65%)
  ████         4 ★ (20%)
  ██           3 ★ (10%)
  █            2 ★ (3%)
  ▌            1 ★ (2%)

[Review cards...]
Name  ·  ★★★★★
Date
"Review text..."
```

- Rating bars use `bg-primary` fill on `bg-muted` track
- Paginate reviews: show 6, "Show more" button loads next page
- Each review card: Avatar (initials fallback) + name + stars + date + comment
- Data from `coursesApi.getById()` which includes reviews, OR separate reviews endpoint

---

## What You'll Learn Section
- 2-column grid of bullet points (CheckCircle icon in `text-primary`)
- Displayed from course description (parse or use static placeholder for prototype)

---

## Instructor Section
- Avatar + name + expertise
- Bio text
- Stats: X courses · Y students

---

## Data Fetching (Server Component)
```typescript
// page.tsx is a Server Component
// Fetch course data server-side for SEO:
const course = await coursesApi.getById(params.id);
// Pass to client components that need interactivity
```

---

## Acceptance Criteria
- [ ] Hero shows correct course data
- [ ] Sticky card visible on desktop, bottom bar on mobile
- [ ] Enroll button shows correct state (guest/enrolled/not enrolled/free)
- [ ] Curriculum accordion expands/collapses
- [ ] Preview lectures marked with badge
- [ ] Locked lectures show lock icon
- [ ] Reviews show rating distribution with visual bars
- [ ] Enrollment check runs on mount if user is authenticated
- [ ] "Go to Course" shown if already enrolled
- [ ] Buy flow: initiate payment → mock confirm → redirect to /learn/[id]
