export function Footer() {
  return (
    <footer className="border-t border-border bg-muted text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo & Tagline */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">CulinaraTech</h2>
            <p className="text-sm">Where technology meets the art of cooking.</p>
          </div>

          {/* Learn Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-foreground transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-foreground transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-foreground transition-colors">
                  Become Instructor
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8">
          <p className="text-center text-xs">
            Copyright © 2024 CulinaraTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
