# Theme Audit — globals.css CSS Variables

## Color Scales

### Primary Scale (Purple)
- `--color-primary-50`: #f0ecff
- `--color-primary-100`: #d9d0fd
- `--color-primary-200`: #b8a8fb
- `--color-primary-300`: #9680f9
- `--color-primary-400`: #7a5ef8
- `--color-primary-500`: #6440F8 (brand color)
- `--color-primary-600`: #5233d9
- `--color-primary-700`: #4028b5
- `--color-primary-800`: #2e1e8a
- `--color-primary-900`: #1c1260

### Secondary Scale (Green/Teal)
- `--color-secondary-50`: #ecfdf5
- `--color-secondary-100`: #d1fae5
- `--color-secondary-200`: #a7f3d0
- `--color-secondary-300`: #6ee7b7
- `--color-secondary-400`: #34d399
- `--color-secondary-500`: #10B981
- `--color-secondary-600`: #059669
- `--color-secondary-700`: #047857
- `--color-secondary-800`: #065f46
- `--color-secondary-900`: #064e3b

### Tertiary Scale (Blue)
- `--color-tertiary-50`: #eef6fd
- `--color-tertiary-100`: #d3e9f9
- `--color-tertiary-200`: #a8d4f3
- `--color-tertiary-300`: #7dbeed
- `--color-tertiary-400`: #5ca7e5
- `--color-tertiary-500`: #418FCD
- `--color-tertiary-600`: #3275aa
- `--color-tertiary-700`: #265a84
- `--color-tertiary-800`: #1a405f
- `--color-tertiary-900`: #0e2639

### Neutral Scale (Gray)
- `--color-neutral-50`: #f6f6f7
- `--color-neutral-100`: #e4e4e7
- `--color-neutral-200`: #c8c9cf
- `--color-neutral-300`: #a0a1ac
- `--color-neutral-400`: #71727f
- `--color-neutral-500`: #4e4f5c
- `--color-neutral-600`: #383944
- `--color-neutral-700`: #27282f
- `--color-neutral-800`: #1A1B1E
- `--color-neutral-900`: #0e0f11

## Semantic Tokens (Light Mode)
- `--color-background`: #f9f9fb
- `--color-foreground`: #111113
- `--color-card`: #ffffff
- `--color-card-foreground`: #111113
- `--color-popover`: #ffffff
- `--color-popover-foreground`: #111113
- `--color-muted`: #f0f0f3
- `--color-muted-foreground`: #71727f
- `--color-border`: #e4e4e7
- `--color-input`: #e4e4e7
- `--color-ring`: #6440F8
- `--color-destructive`: #ef4444
- `--color-destructive-foreground`: #ffffff

### Dark Mode Overrides
- `--color-background`: #111113
- `--color-foreground`: #f0f0f3
- `--color-card`: #1a1b1e
- `--color-card-foreground`: #f0f0f3
- `--color-popover`: #1a1b1e
- `--color-popover-foreground`: #f0f0f3
- `--color-muted`: #27282f
- `--color-muted-foreground`: #a0a1ac
- `--color-border`: #27282f
- `--color-input`: #27282f

## Material Design 3 Tokens
Primary, secondary, tertiary with container variants, surface variants, error states, and on-color variations for maximum flexibility.

## Border Radius
- `--radius-sm`: 0.375rem (6px)
- `--radius-md`: 0.5rem (8px)
- `--radius-lg`: 0.625rem (10px)
- `--radius-xl`: 0.75rem (12px)
- `--radius-2xl`: 1rem (16px)

## Typography

### Font Families
- `--font-headline`: Space Grotesk (used for h1-h3)
- `--font-body`: Inter (used for body text and labels)
- `--font-sans`: Inter

### Font Sizes
**Display Sizes** (headings)
- `--text-display-lg`: 3rem (48px)
- `--text-display-md`: 2.25rem (36px)
- `--text-display-sm`: 1.875rem (30px)
- `--text-display-xs`: 1.5rem (24px)

**Body Sizes**
- `--text-body-xl`: 1.25rem (20px)
- `--text-body-lg`: 1.125rem (18px)
- `--text-body-md`: 1rem (16px) — default body text
- `--text-body-sm`: 0.875rem (14px)
- `--text-body-xs`: 0.75rem (12px)

**Label Sizes**
- `--text-label-lg`: 0.875rem (14px)
- `--text-label-md`: 0.8125rem (13px)
- `--text-label-sm`: 0.875rem (14px)

## Spacing
- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 3rem (48px)
- `--spacing-gutter`: 1.25rem (20px)

## Custom Components
- `.btn-primary`: Primary button with hover/active states
- `.btn-secondary`: Secondary button (green)
- `.btn-inverted`: Dark inverted button
- `.btn-outlined`: Outlined primary button
- `.card-cyber`: Card base with hover effects
- `.text-gradient-primary`: Purple-to-blue gradient text
- `.text-gradient-secondary`: Green-to-blue gradient text
- `.text-gradient-brand`: Purple-green-blue 3-color gradient
- `.glow-primary`, `.glow-secondary`, `.glow-tertiary`: Glow box shadows
- `.glass*`: Glassmorphism effects
- `.airy-shadow`: Light, subtle shadow

## IMPORTANT RULES FOR COMPONENTS
1. **Use semantic tokens first**: `text-foreground`, `bg-background`, `bg-card`, `text-muted-foreground`, `border`, `bg-primary`, `text-primary-foreground`
2. **Avoid hardcoded colors**: Never use `text-gray-600`, `bg-blue-500`, etc. — these don't exist in the theme
3. **Use color scale for intentional emphasis**: When you need specific colors beyond semantic tokens, use the scale: `text-primary-500`, `bg-secondary-400`, etc.
4. **Radius tokens exist**: Always use `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` — never hardcoded pixel values
5. **Spacing tokens exist**: Use `px-spacing-md`, `py-spacing-lg`, `gap-spacing-md` where applicable
6. **Typography**: Use the font families and sizes defined, avoid arbitrary font sizes
