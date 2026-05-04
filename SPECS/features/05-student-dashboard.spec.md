# Feature Spec: Student Dashboard (Phase 2)

## Page
`src/app/(protected)/dashboard/page.tsx`

## Components
- `src/components/dashboard/EnrolledCourseCard.tsx`
- `src/components/dashboard/ProgressBar.tsx`

---

## Page Layout

```
┌─────────────────────────────────────────────────┐
│  Welcome back, [Name]! 👋                       │
│  You have X courses in progress                 │
└─────────────────────────────────────────────────┘

[In Progress]  [Completed]  [All Courses]   ← Tab filter

┌────────────────────────────────────────────────────┐
│  ENROLLED COURSES GRID                             │
│  2 columns desktop, 1 column mobile               │
│  Each card shows progress bar                     │
└────────────────────────────────────────────────────┘
```

---

## Header Section
- "Welcome back, {user.name}!" using name from auth store
- Summary stats in small cards:
  ```
  [📚 X Courses]  [✅ Y Completed]  [⏱ Z Hours Learned]
  ```
  - `bg-card border rounded-lg` for stat cards

---

## Tab Filter
shadcn `<Tabs>` with values: `in-progress`, `completed`, `all`
- "In Progress" → courses where completionPercentage > 0 and < 100
- "Completed" → completionPercentage = 100
- "All" → all enrolled courses

---

## EnrolledCourseCard Component

```
┌───────────────────────────────────────────────┐
│  [Thumbnail 16:9]                             │
├───────────────────────────────────────────────┤
│  Course Title (line-clamp-2)                  │
│  Instructor name            text-muted sm     │
│                                               │
│  ████████████░░░░  65%                        │  ← ProgressBar
│  13 of 20 lectures completed                  │
│                                               │
│  [Continue Learning]  [View Certificate?]     │
└───────────────────────────────────────────────┘
```

### ProgressBar Component
```typescript
// Props: percentage (0-100), showLabel?: boolean
// Track: bg-muted rounded-full h-2
// Fill: bg-primary rounded-full (width = percentage%)
// Label: "{percentage}%" in text-sm text-muted-foreground
// If 100%: fill is bg-green-500 (use theme success color if available)
```

### Continue Learning Button
- `<Button size="sm">` → navigate to `/learn/{courseId}`
- If 100% complete: show "View Certificate" button instead

---

## Empty State
When no enrolled courses:
```
[Illustration or icon]
You haven't enrolled in any courses yet.
[Browse Courses] → /
```

---

## Data Fetching
```typescript
// Client component — needs auth
// useMyEnrollments() for course list
// For each course, ideally get progress from a single batch endpoint
// Prototype: use progress data embedded in enrollment response, or fetch per-course
```

---

## Acceptance Criteria
- [ ] Redirects to /auth/login if not authenticated (middleware handles this)
- [ ] Shows correct user name from store
- [ ] Tab filter works for in-progress / completed / all
- [ ] Progress bar shows correct percentage
- [ ] "Continue Learning" navigates to learn page
- [ ] Empty state shown when no enrollments
- [ ] Stats cards show correct counts
