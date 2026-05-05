import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function ThemeDemoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline">CulinaraTech Theme</h1>
            <p className="text-muted-foreground mt-2">Light & Dark Mode Demo</p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
            <span className="text-sm font-medium">Toggle Theme:</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-headline mb-6">Semantic Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Background */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-background"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Background</p>
                <p className="text-xs text-muted-foreground">--color-background</p>
              </div>
            </div>

            {/* Surface */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-card"></div>
              <div className="p-3 bg-muted">
                <p className="text-sm font-medium">Card</p>
                <p className="text-xs text-muted-foreground">--color-card</p>
              </div>
            </div>

            {/* Primary */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-primary-500 dark:bg-primary"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">--color-primary</p>
              </div>
            </div>

            {/* Secondary */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-secondary-500 dark:bg-secondary"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">--color-secondary</p>
              </div>
            </div>

            {/* Tertiary */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-tertiary-500 dark:bg-tertiary"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Tertiary</p>
                <p className="text-xs text-muted-foreground">--color-tertiary</p>
              </div>
            </div>

            {/* Muted */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-muted"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Muted</p>
                <p className="text-xs text-muted-foreground">--color-muted</p>
              </div>
            </div>

            {/* Destructive */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-destructive dark:bg-error"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Destructive</p>
                <p className="text-xs text-muted-foreground">--color-destructive</p>
              </div>
            </div>

            {/* Border */}
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-24 bg-border"></div>
              <div className="p-3 bg-card">
                <p className="text-sm font-medium">Border</p>
                <p className="text-xs text-muted-foreground">--color-border</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-headline mb-6">Typography</h2>
          <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
            <h1 className="text-4xl font-bold font-headline">Heading 1 (Display Large)</h1>
            <h2 className="text-3xl font-bold font-headline">Heading 2 (Display Medium)</h2>
            <h3 className="text-2xl font-bold font-headline">Heading 3 (Display Small)</h3>
            <h4 className="text-xl font-bold font-headline">Heading 4 (Display XSmall)</h4>
            <p className="text-lg font-body">Body Large - The quick brown fox jumps over the lazy dog</p>
            <p className="text-base font-body">Body Medium - The quick brown fox jumps over the lazy dog</p>
            <p className="text-sm text-muted-foreground font-body">Body Small - The quick brown fox jumps over the lazy dog</p>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">Label Small</p>
          </div>
        </section>

        {/* Components Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-headline mb-6">Components</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Cards</h3>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-bold mb-2">Card Title</h4>
                <p className="text-muted-foreground text-sm">This is a sample card with hover effect</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium">Muted Background</p>
                <p className="text-xs text-muted-foreground">Secondary information</p>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Text Colors</h3>
              <p className="text-foreground">Foreground - Primary text color</p>
              <p className="text-muted-foreground">Muted Foreground - Secondary text color</p>
              <p className="text-primary-500 dark:text-primary">Primary - Links and emphasis</p>
              <p className="text-destructive dark:text-error">Destructive - Alerts and errors</p>
            </div>
          </div>
        </section>

        {/* Surface Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-headline mb-6">Surface Variants</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-surface-container border border-border">
              <p className="font-medium">Surface Container</p>
              <p className="text-sm text-muted-foreground">--color-surface-container</p>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-low border border-border">
              <p className="font-medium">Surface Container Low</p>
              <p className="text-sm text-muted-foreground">--color-surface-container-low</p>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-high border border-border">
              <p className="font-medium">Surface Container High</p>
              <p className="text-sm text-muted-foreground">--color-surface-container-high</p>
            </div>
          </div>
        </section>

        {/* Info Box */}
        <section className="bg-primary-50 dark:bg-primary-container/20 border border-primary-200 dark:border-primary-500/30 rounded-lg p-6">
          <h3 className="font-bold mb-2">🎨 Theme Implementation</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>✓ Light and dark mode support via CSS variables</li>
            <li>✓ Smooth transitions between themes</li>
            <li>✓ Persistent theme preference in localStorage</li>
            <li>✓ Respects system color scheme preference</li>
            <li>✓ All semantic color tokens for consistent styling</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
