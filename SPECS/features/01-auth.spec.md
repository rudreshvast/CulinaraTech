# Feature Spec: Authentication (Phase 1)

## Pages
- `/auth/login` → `src/app/(public)/auth/login/page.tsx`
- `/auth/signup` → `src/app/(public)/auth/signup/page.tsx`

## Components
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/SignupForm.tsx`

---

## LoginForm Component

### Layout
Two-column on desktop (left: branding panel, right: form). Single column on mobile.

### Left Panel (desktop only, hidden on mobile)
- Background: `bg-primary`
- Show app logo/name in `text-primary-foreground`
- Tagline: "Learn without limits"
- Decorative pattern or subtle illustration (CSS only)

### Right Panel — Form
- Centered card using shadcn `<Card>`
- Heading: "Welcome back"
- Subheading: "Sign in to continue learning" in `text-muted-foreground`

#### Fields (React Hook Form + Zod loginSchema)
```
Email
  <Input type="email" placeholder="you@example.com" />
  Show error below field in text-destructive

Password
  <Input type="password" />
  Show/hide toggle button inside input (Eye/EyeOff icon from lucide-react)
  Show error below
```

#### Submit Button
- Full width shadcn `<Button>` with `bg-primary`
- Loading state: show `<Loader2 className="animate-spin" />` + "Signing in..."
- Disabled while loading

#### Footer links
- "Don't have an account? Sign up" → `/auth/signup`
- "Forgot password?" → placeholder (no functionality needed for prototype)

### Form Behavior
1. On submit → call `useLogin()` mutation
2. On success → redirect to `/dashboard`
3. On error → show error toast using shadcn `toast` (from `useToast`)
4. Common error messages:
   - 401 → "Invalid email or password"
   - 500 → "Something went wrong. Please try again."

---

## SignupForm Component

### Layout
Same two-column layout as login.

### Right Panel — Form
- Heading: "Create your account"

#### Fields (React Hook Form + Zod registerSchema)
```
Full Name
  <Input placeholder="John Doe" />

Email
  <Input type="email" />

Password
  <Input type="password" with show/hide toggle />
  Helper text: "Minimum 8 characters"

I want to...  (Role selector)
  Two cards, radio-style selection:
  ┌─────────────────────┐  ┌─────────────────────┐
  │  🎓 Learn           │  │  📚 Teach            │
  │  Enroll in courses  │  │  Create & sell       │
  │  and track progress │  │  your own courses    │
  └─────────────────────┘  └─────────────────────┘
  Selected card: border-primary bg-primary/5
  Uses value: STUDENT | INSTRUCTOR
```

#### Submit Button
- "Create account" with loading state

#### Footer
- "Already have an account? Sign in" → `/auth/login`

### Form Behavior
1. On submit → call `useRegister()` mutation
2. On success → redirect to `/dashboard`
3. On error → show toast

---

## Route Group Layout
`src/app/(public)/auth/layout.tsx`
- No navbar/footer on auth pages
- Just render `{children}` centered on screen

---

## Acceptance Criteria
- [ ] Both forms validate on submit (Zod errors shown inline)
- [ ] Password show/hide works
- [ ] Login redirects to /dashboard on success
- [ ] Register with INSTRUCTOR role → user gets instructor role
- [ ] Error toasts shown on API failure
- [ ] Loading states disable submit button
- [ ] Forms are responsive (mobile stacks, desktop splits)
- [ ] No hardcoded colors — all theme tokens
