# Feature Spec: Layout & Navigation (Phase 1)

## Components
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/app/(public)/layout.tsx`
- `src/app/(protected)/layout.tsx`
- `src/app/providers.tsx`
- `src/app/layout.tsx`

---

## Root Layout (`src/app/layout.tsx`)
- Wrap children in `<Providers>`
- Include `<Toaster />` from shadcn
- Set metadata: title, description
- Font: use existing font from globals.css (DO NOT change)

## Providers (`src/app/providers.tsx`)
`'use client'`
- Wrap with `QueryClientProvider` (TanStack Query)
- On mount: if accessToken in store → call `authApi.me()` → update user in store
- Include `ReactQueryDevtools` in development only

---

## Navbar Component
`'use client'` — needs auth store

### Layout
```
[Logo]  [Search Bar]  [Categories ▼]     [Teach on Platform]  [Cart]  [Login] [Signup]
                                                   OR (if authenticated)
[Logo]  [Search Bar]  [Categories ▼]     [User Avatar ▼ dropdown]
```

### Logo
- App name in `font-bold text-foreground`
- Links to `/`

### Search Bar (desktop only, hidden on mobile)
- shadcn `<Input>` with Search icon inside
- Placeholder: "Search for anything"
- On enter → navigate to `/?search=<query>`
- Width: `max-w-md flex-1`

### Categories Dropdown
- shadcn `<DropdownMenu>`
- Trigger: "Categories" with ChevronDown icon
- Items: fetched from `useCategories()` hook → `categoriesApi.getAll()`
- Each item navigates to `/?categoryId=<id>`

### Unauthenticated state
- "Teach on [AppName]" → `/auth/signup?role=INSTRUCTOR`
- "Log in" → `<Button variant="outline">` → `/auth/login`
- "Sign up" → `<Button>` (primary) → `/auth/signup`

### Authenticated state
- Show user avatar (shadcn `<Avatar>`) with initials fallback
- Dropdown menu (`<DropdownMenu>`):
  ```
  My Learning       → /dashboard
  ─────────────────
  [if INSTRUCTOR]:
  Instructor Dashboard → /instructor
  My Courses           → /instructor/courses
  ─────────────────
  Profile Settings  → /profile (placeholder)
  ─────────────────
  Log out           → calls useLogout()
  ```

### Mobile
- Hamburger menu (Menu icon from lucide)
- shadcn `<Sheet>` slides in from left
- Contains: logo, search input, nav links, auth buttons or user menu

---

## Public Layout (`src/app/(public)/layout.tsx`)
- Server Component
- Renders `<Navbar />` + `{children}` + `<Footer />`

## Protected Layout (`src/app/(protected)/layout.tsx`)
- Server Component
- Renders `<Navbar />` + `{children}` (no footer on learn pages)
- Actual route protection handled by `middleware.ts`

---

## Footer Component
Simple, 3-column grid:

```
[Logo + tagline]    [Learn]           [Company]
                    Courses           About
                    Categories        Careers
                    Become Instructor Blog

Copyright © 2024 [AppName]. All rights reserved.
```
- `bg-muted text-muted-foreground`
- Links are placeholder hrefs `#`

---

## Acceptance Criteria
- [ ] Navbar shows correct state for logged-in vs guest
- [ ] Logout clears store and redirects to /
- [ ] Categories populate from API
- [ ] Mobile menu opens/closes correctly
- [ ] Avatar shows initials when no avatarUrl
- [ ] Instructor menu items only visible to INSTRUCTOR role
- [ ] Search navigates to catalog with query param
