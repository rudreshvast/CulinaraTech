"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Briefcase, Users } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {/* ---------------- DESKTOP TOP NAV ---------------- */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
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
            <NavigationMenuList className="gap-6 font-['Space_Grotesk'] text-sm">
              <NavigationMenuItem>
                <Link
                  href="/"
                 className={`pb-1 ${
                    pathname == "/"
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-black font-medium"
                  }`}
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/courses"
                  className={`pb-1 ${
                    pathname == "/courses"
                      ? "text-[#6440FB] font-bold border-b-2 border-[#6440FB]"
                      : "text-black font-medium"
                  }`}
                >
                  Courses
                </Link>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                  Courses
                </NavigationMenuTrigger>

                <NavigationMenuContent className="p-3 min-w-[220px]">
                  <div className="flex flex-col gap-2">
                    <NavigationMenuLink asChild>
                      <Link href="/courses/food-safety">
                        Food Safety
                      </Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                      <Link href="/courses/dairy">
                        Dairy Processing
                      </Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                      <Link href="/courses/protein">
                        Protein Synthesis
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <Link
                  href="/apprenticeships"
                  className="text-black hover:text-[#6440FB]"
                >
                  Apprenticeships
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/partners"
                  className="text-black hover:text-[#6440FB]"
                >
                  Partners
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(100,64,251,0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#6440FB] text-white px-6 py-2 rounded-lg text-sm font-bold"
          >
            Join Platform
          </motion.button>
        </nav>
      </motion.header>

      {/* ---------------- MOBILE TOP HEADER (Logo) ---------------- */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="md:hidden bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
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
        <div className="mx-4 mb-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl px-4 py-3">
          <div className="flex justify-between items-center">
            <NavItem icon={<Home size={20} />} label="Home" href="/" active />
            <NavItem
              icon={<BookOpen size={20} />}
              label="Courses"
              href="/courses"
            />
            <NavItem
              icon={<Briefcase size={20} />}
              label="Jobs"
              href="/apprenticeships"
            />
            <NavItem
              icon={<Users size={20} />}
              label="Partners"
              href="/partners"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* Mobile Nav Item */
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
          active ? "text-[#6440FB]" : "text-slate-500"
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
