"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, Award, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useLogout } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* ---------------- DESKTOP TOP NAV ---------------- */}
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
                  href="/internship"
                  className={`pb-1 ${
                    pathname.startsWith("/internship")
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
                  onClick={() => router.push("/dashboard")}
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

      {/* ---------------- MOBILE TOP HEADER (Logo) ---------------- */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="md:hidden bg-card/80 dark:bg-card/60 backdrop-blur-md sticky top-0 z-50 border-b border-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.30)]"
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
      {/* ---------------- MOBILE BOTTOM NAV ---------------- */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mb-4 rounded-2xl bg-card/90 dark:bg-card/80 backdrop-blur-xl border border-border dark:border-border shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-4 py-3">
          <div className="flex justify-between items-center">
            <NavItem
              icon={<Home size={20} />}
              label={isAuthenticated ? "Dashboard" : "Home"}
              href={isAuthenticated ? "/dashboard" : "/"}
              active={isAuthenticated ? pathname === "/dashboard" : pathname === "/"}
            />
            <NavItem
              icon={<BookOpen size={20} />}
              label="Courses"
              href="/courses"
              active={pathname.startsWith("/courses")}
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col items-center gap-1">
                <Award size={20} className={pathname.startsWith("/internship") || pathname.startsWith("/training") || pathname.startsWith("/opportunities") ? "text-[#6440FB]" : "text-muted-foreground"} />
                <span className={`text-xs font-medium ${pathname.startsWith("/internship") || pathname.startsWith("/training") || pathname.startsWith("/opportunities") ? "text-[#6440FB]" : "text-muted-foreground"}`}>Career</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mb-20">
                <DropdownMenuItem asChild>
                  <Link href="/internship" className="flex items-center cursor-pointer">
                    Internships
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/training" className="flex items-center cursor-pointer">
                    Training
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/opportunities" className="flex items-center cursor-pointer">
                    Jobs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isAuthenticated ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/profile")}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-6 h-6 rounded-full bg-[#6440FB] flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user?.name?.[0]?.toUpperCase()}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-foreground">Profile</span>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/auth/signup")}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-6 h-6 rounded-full bg-[#6440FB] flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
                <span className="text-xs font-medium text-foreground">Sign Up</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function NavItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={`flex flex-col items-center gap-1 ${
          active ? "text-[#6440FB]" : "text-muted-foreground"
        }`}
      >
        {icon}
        <span className="text-xs font-medium">{label}</span>
        {active && (
          <motion.div
            layoutId="mobileIndicator"
            className="w-1 h-1 bg-[#6440FB] rounded-full"
          />
        )}
      </motion.div>
    </Link>
  );
}
