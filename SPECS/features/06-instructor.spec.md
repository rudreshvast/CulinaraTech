# Feature Spec: Instructor Dashboard & Course Management (Phase 2)

## Pages
- `src/app/(protected)/instructor/page.tsx` — dashboard overview
- `src/app/(protected)/instructor/courses/page.tsx` — my courses list
- `src/app/(protected)/instructor/courses/new/page.tsx` — create course
- `src/app/(protected)/instructor/courses/[id]/edit/page.tsx` — edit course + manage content

---

# Instructor Dashboard (`/instructor`)

## Layout
```
┌────────────────────────────────────────────────────┐
│  Instructor Dashboard                              │
│  Manage your courses and track earnings            │
└────────────────────────────────────────────────────┘

┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Total   │  │Published│  │ Total   │  │ Avg     │
│ Courses │  │ Courses │  │Students │  │ Rating  │
│   12    │  │    8    │  │  1,234  │  │  4.6 ★  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘

Recent Courses
[Table of recent 5 courses with status, students, revenue]

[Go to All Courses →]  [Create New Course →]
```

## Stats Cards
- `bg-card border` with icon
- Total Courses: count from `useMyCourses()`
- Published: filter by status=PUBLISHED
- Total Students: sum of `enrollmentCount` across all courses
- Avg Rating: average of `averageRating` across published courses

## Recent Courses Table
shadcn `<Table>`:
```
Title  |  Status Badge  |  Students  |  Rating  |  Actions
```
- Status badge: DRAFT=secondary, PUBLISHED=success green, ARCHIVED=destructive
- Actions: Edit (pencil icon) | Publish/Archive toggle

---

# My Courses List (`/instructor/courses`)

## Layout
```
My Courses                    [+ Create New Course]

[Search courses...]  [All ▼ Status filter]

[Course table rows]
```

## Courses Table
Full table with columns:
```
Thumbnail | Title | Status | Students | Rating | Revenue | Actions
```

### Status Badge colors
- DRAFT → `bg-secondary text-secondary-foreground`
- PUBLISHED → `bg-green-100 text-green-800` (or theme success vars)
- ARCHIVED → `bg-destructive/10 text-destructive`

### Actions column
- **Edit**: navigate to `/instructor/courses/[id]/edit`
- **Publish** (if DRAFT): calls `usePublishCourse()` → confirm dialog first
- **Archive** (if PUBLISHED): calls `useArchiveCourse()` → confirm dialog
- **Delete** (if DRAFT): calls `useDeleteCourse()` → confirm dialog

### Confirm Dialog
Use shadcn `<AlertDialog>` for destructive actions.

---

# Create Course (`/instructor/courses/new`)

## Form Layout
Single column, card layout.

```
Create a New Course

[Back to My Courses]

┌─────────────────────────────────────────────┐
│  Basic Information                          │
│                                             │
│  Course Title *                             │
│  [Input]                                    │
│                                             │
│  Description *                             │
│  [Textarea - min 5 rows]                   │
│                                             │
│  Category *           Level *              │
│  [Select]             [Select]             │
│                                             │
│  Price (₹) *          Language             │
│  [Number Input]       [Input]              │
│                                             │
│  Thumbnail URL                              │
│  [Input]  [Preview if valid URL]           │
└─────────────────────────────────────────────┘

[Cancel]  [Create Course →]
```

### Fields (React Hook Form + createCourseSchema)
- Title: required, min 5 chars
- Description: required, min 20 chars, textarea
- Category: shadcn `<Select>` populated from `categoriesApi.getAll()`
- Level: `<Select>` with BEGINNER / INTERMEDIATE / ADVANCED
- Price: number input, min 0. `0` = Free
- Language: text input, default "English"
- Thumbnail URL: optional URL input, show `<img>` preview below

### On Submit
- Call `useCreateCourse()` mutation
- On success → navigate to `/instructor/courses/{newId}/edit`
- On error → toast error

---

# Edit Course (`/instructor/courses/[id]/edit`)

## Layout — Two panels

```
┌──────────────────┐  ┌────────────────────────────────┐
│  SIDEBAR         │  │  MAIN CONTENT AREA             │
│                  │  │  (changes based on sidebar)    │
│  ○ Course Info   │  │                                │
│  ○ Curriculum    │  │                                │
│  ○ Settings      │  │                                │
│                  │  │                                │
│  ─────────────   │  │                                │
│  Status: DRAFT   │  │                                │
│  [Publish Course]│  │                                │
└──────────────────┘  └────────────────────────────────┘
```

## Tab: Course Info
Same form as Create Course, pre-filled.
"Save Changes" button calls `useUpdateCourse()`.

## Tab: Curriculum
This is the main content management UI.

```
Course Curriculum

[+ Add Section]

▼ Section 1: Getting Started
  [Edit title] [Delete section]
  ├── Lecture 1: Introduction         [Edit] [Delete]
  ├── Lecture 2: Setup               [Edit] [Delete]
  └── [+ Add Lecture]

▼ Section 2: Core Concepts
  [Edit title] [Delete section]
  └── [+ Add Lecture]

[+ Add Section]
```

### Add Section
- Inline form appears below last section
- Input for title + "Add" and "Cancel" buttons
- Calls `coursesApi.createSection()`

### Add Lecture (within a section)
- Inline form or small dialog
- Fields: Title, Description (optional), Video URL (optional), Duration (seconds), Is Preview toggle
- Calls `coursesApi.createLecture()`

### Edit Lecture
- shadcn `<Dialog>` opens with pre-filled form
- Same fields as Add Lecture
- Calls `coursesApi.updateLecture()`

### Delete Section / Lecture
- `<AlertDialog>` confirmation
- Calls respective delete API

### Publish Button (sidebar)
- Only enabled when at least 1 lecture exists
- Calls `usePublishCourse()`
- Shows warning if < 1 lecture: "Add at least one lecture before publishing"

## Tab: Settings
- Danger zone: Delete Course (only if DRAFT)
- Archive Course (if PUBLISHED)

---

## Access Control
- All instructor pages: check `user.roles.includes('INSTRUCTOR')` in the layout
- If not instructor → redirect to `/dashboard`

---

## Acceptance Criteria
- [ ] Dashboard stats calculated correctly
- [ ] Course table shows all courses with correct status badges
- [ ] Publish/Archive/Delete with confirmation dialogs
- [ ] Create course form validates with Zod
- [ ] Thumbnail preview shows when valid URL entered
- [ ] Edit page pre-fills all form fields
- [ ] Curriculum: add/edit/delete sections and lectures
- [ ] Publish button disabled when no lectures
- [ ] Non-instructors redirected away from /instructor
