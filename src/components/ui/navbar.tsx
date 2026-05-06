"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Home, BookOpen, User, UserPlus, LogOut, Plus, X, Briefcase, Award, Compass, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useLogout } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [fabOpen, setFabOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const closeFab = () => setFabOpen(false);

  // Navigation items based on auth state
  const navItems = isAuthenticated
    ? [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', angle: 0 },
        { icon: BookOpen, label: 'Courses', href: '/courses', angle: 60 },
        { icon: Briefcase, label: 'Internship', href: '/internships', angle: 120 },
        { icon: Award, label: 'Training', href: '/training', angle: 180 },
        { icon: Compass, label: 'Opportunities', href: '/opportunities', angle: 240 },
        { icon: User, label: 'Profile', href: '/profile', angle: 300 },
      ]
    : [
        { icon: Home, label: 'Home', href: '/', angle: 0 },
        { icon: BookOpen, label: 'Courses', href: '/courses', angle: 60 },
        { icon: Briefcase, label: 'Internship', href: '/internships', angle: 120 },
        { icon: Award, label: 'Training', href: '/training', angle: 180 },
        { icon: Compass, label: 'Opportunities', href: '/opportunities', angle: 240 },
        { icon: UserPlus, label: 'Sign Up', href: '/auth/signup', angle: 300, highlight: true },
      ];

  const radiusDistance = 100;

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block bg-card/80 dark:bg-card/60 backdrop-blur-md sticky top-0 z-50 border-b border-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.30)]"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <motion.span
              whileHover={{ rotate: 20 }}
              className="material-symbols-outlined text-[#6440FB]"
            >
              restaurant_menu
            </motion.span>
            <span className="text-xl font-bold text-[#6440FB] tracking-tighter">
              CulinaraTech
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-8 font-['Space_Grotesk'] text-sm">
              <NavigationMenuItem>
                <Link
                  href={isAuthenticated ? "/dashboard" : "/"}
                  className={`pb-1 ${
                    (isAuthenticated ? pathname === "/dashboard" : pathname === "/")
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-foreground font-medium hover:text-[#6440FB]"
                  }`}
                >
                  {isAuthenticated ? "Dashboard" : "Home"}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/courses"
                  className={`pb-1 ${
                    pathname.startsWith("/courses")
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-foreground font-medium hover:text-[#6440FB]"
                  }`}
                >
                  Courses
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/training"
                  className={`pb-1 ${
                    pathname.startsWith("/training")
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-foreground font-medium hover:text-[#6440FB]"
                  }`}
                >
                  Training
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/internships"
                  className={`pb-1 ${
                    pathname.startsWith("/internships")
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-foreground font-medium hover:text-[#6440FB]"
                  }`}
                >
                  Internships
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/opportunities"
                  className={`pb-1 ${
                    pathname.startsWith("/opportunities")
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-foreground font-medium hover:text-[#6440FB]"
                  }`}
                >
                  Opportunities
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/profile")}
                  className="w-10 h-10 rounded-full bg-[#6440FB] flex items-center justify-center text-white text-sm font-bold hover:shadow-lg transition"
                >
                  {user?.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase() || 'U'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 hover:bg-muted rounded-lg transition"
                  title="Logout"
                >
                  <LogOut size={20} className="text-[#6440FB]" />
                </motion.button>
              </div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/login"
                    className="text-foreground font-medium px-4 py-2 hover:text-[#6440FB] transition"
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 20px rgba(100,64,251,0.35)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/auth/signup")}
                  className="bg-[#6440FB] text-white px-6 py-2 rounded-lg text-sm font-bold"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>
        </nav>
      </motion.header>

      {/* MOBILE TOP HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="md:hidden bg-card/80 dark:bg-card/60 backdrop-blur-md sticky top-0 z-40 border-b border-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.30)]"
      >
        <div className="px-5 py-4 flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: 20 }}
            className="material-symbols-outlined text-[#6440FB]"
          >
            restaurant_menu
          </motion.span>
          <span className="text-xl font-bold text-[#6440FB] tracking-tighter">
            CulinaraTech
          </span>
        </div>
      </motion.header>

      {/* MOBILE FAB NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-6 pointer-events-none">
        {/* Overlay */}
        <AnimatePresence>
          {fabOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFab}
              className="fixed inset-0 z-30 pointer-events-auto bg-black/20 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Radial Menu Items */}
        <div className="relative w-32 h-56 pointer-events-auto z-40">
          <AnimatePresence>
            {fabOpen &&
              navItems.map((item) => {
                const Icon = item.icon;
                const angle = (item.angle * Math.PI) / 180;
                const x = radiusDistance * Math.cos(angle);
                const y = radiusDistance * Math.sin(angle);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, x, y }}
                    exit={{ scale: 0, x: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                  >
                    <Link href={item.href}>
                      <motion.button
                        onClick={closeFab}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={item.label}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl ${
                          item.highlight
                            ? 'bg-secondary text-white'
                            : 'bg-primary text-white'
                        }`}
                      >
                        <Icon size={24} />
                      </motion.button>
                    </Link>
                    <span className="text-xs font-semibold text-foreground whitespace-nowrap">{item.label}</span>
                  </motion.div>
                );
              })}
          </AnimatePresence>

          {/* FAB Button */}
          <motion.button
            onClick={() => setFabOpen(!fabOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#534AB7] text-white flex items-center justify-center shadow-2xl hover:shadow-lg transition-all duration-200 z-50"
            aria-label={fabOpen ? 'Close navigation' : 'Open navigation'}
          >
            <motion.div
              animate={{ rotate: fabOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {fabOpen ? <X size={28} /> : <Plus size={28} />}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </>
  );
}
