# Feature Spec: Course Catalog — Homepage (Phase 2)

## Page
`src/app/(public)/page.tsx`

## Components
- `src/components/courses/CourseCard.tsx`
- `src/components/courses/CourseGrid.tsx`
- `src/components/courses/CourseFilters.tsx`
- `src/components/shared/StarRating.tsx`
- `src/components/shared/PriceDisplay.tsx`

---

## Page Layout

```
┌─────────────────────────────────────────────────┐
│  HERO BANNER (if no search active)              │
│  "Find your next skill"  [Search input]         │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  CATEGORY PILLS (horizontal scroll)             │
│  [All] [Web Dev] [Design] [Data Science] ...    │
└─────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────┐
│ FILTERS      │  COURSE GRID                     │
│ (sidebar     │  3 columns desktop               │
│  desktop /   │  2 columns tablet                │
│  sheet       │  1 column mobile                 │
│  mobile)     │                                  │
└──────────────┴──────────────────────────────────┘
                  PAGINATION
```

---

## Hero Banner
Shown only when no `search` query param is active.
- `bg-primary text-primary-foreground` (or a subtle gradient using theme vars)
- Heading: "Learn without limits" (large, bold)
- Subheading: "Explore thousands of courses from expert instructors"
- Large search input with "Search for anything" placeholder
- On search submit → updates URL `?search=<query>` using `router.push`

---

## Category Pills
- Horizontal scrollable row, no scrollbar visible (`overflow-x-auto scrollbar-hide`)
- shadcn `<Badge>` style pills
- "All" pill always first
- Active category: `bg-primary text-primary-foreground`
- Inactive: `bg-secondary text-secondary-foreground hover:bg-primary/10`
- Click → updates URL `?categoryId=<id>`
- Data from `categoriesApi.getAll()`

---

## CourseFilters Component
### Desktop: sticky left sidebar (w-64)
### Mobile: `<Sheet>` triggered by "Filters" button

```
Level
  ○ All
  ○ Beginner
  ○ Intermediate
  ○ Advanced

Sort by
  ○ Newest
  ○ Most Popular
  ○ Highest Rated
  ○ Price: Low to High
  ○ Price: High to Low
```
- Uses shadcn `<RadioGroup>`
- Filter changes update URL query params
- "Clear filters" button resets all params

---

## CourseCard Component
`'use client'`

```
┌────────────────────────────┐
│   THUMBNAIL (16:9)         │  ← bg-muted if no image
│   [hover overlay: Preview] │
├────────────────────────────┤
│ Title (2 lines max,        │
│ line-clamp-2)              │
│ Instructor name            │  text-muted-foreground text-sm
│ ★★★★☆ 4.5 (1,234)         │  StarRating + count
│ Duration · Level           │  text-muted-foreground text-xs
│ ₹999  ~~₹1,999~~           │  PriceDisplay
└────────────────────────────┘
```

### Thumbnail
- `aspect-video` ratio
- `object-cover` if image exists
- `bg-muted` placeholder if no thumbnailUrl
- On hover: overlay with "View Course" button

### StarRating Component
```typescript
// Props: rating (number), count? (number), size?: 'sm' | 'md'
// Renders filled/half/empty stars using CSS
// Show numeric rating bold + count in muted
// e.g. "4.5 (1,234 ratings)"
```

### PriceDisplay Component
```typescript
// Props: price (number), originalPrice?: number
// If price === 0 → show "Free" badge in green
// If price > 0 → format as currency (₹ or $)
// If originalPrice exists → show strikethrough
```

### Card interaction
- Entire card is clickable → `/courses/[id]`
- Hover: subtle shadow lift (`hover:shadow-md transition-shadow`)
- Uses shadcn `<Card>` as wrapper

---

## CourseGrid Component
```typescript
// Props: courses: CourseListItem[], isLoading: boolean
// Loading: render 8 skeleton cards (shadcn <Skeleton>)
// Empty: show "No courses found" illustration + message
// Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

Skeleton card shape mirrors CourseCard exactly — same dimensions.

---

## Page State Management
- All filters/search/sort/page stored as URL query params
- Use `useSearchParams()` to read, `router.push()` to update
- `useCourses(params)` hook reads from URL params
- Pagination: shadcn-style numbered pagination at bottom
- Show "X results found" count above grid

---

## Acceptance Criteria
- [ ] URL reflects all active filters (shareable links work)
- [ ] Category pills highlight active selection
- [ ] CourseCard shows skeleton while loading
- [ ] Price shown as "Free" when price = 0
- [ ] StarRating renders correctly for 0–5 with decimals
- [ ] Empty state shown when no results
- [ ] Pagination works and scrolls to top on page change
- [ ] Filters panel works on both mobile (Sheet) and desktop (sidebar)
- [ ] Hero hidden when search is active
- [ ] All colors use theme tokens only
