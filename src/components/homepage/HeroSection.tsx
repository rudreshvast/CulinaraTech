"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "../ui/MaterialIcon";

export function HeroSection() {
  return (
    <section className="relative py-8 md:py-8 lg:py-16 overflow-hidden bg-surface">
      {/* Subtle Textures */}
      <div className="absolute left-0 top-0 w-1/4 h-full dot-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 tactile-grain"></div>

      <div className="max-w-7xl mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* LEFT COLUMN (55%) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center bg-primary-container text-on-primary-container px-4 py-1 rounded-full w-fit mb-4"
          >
            <span className="text-xs py-1 font-semibold uppercase tracking-wider">
              Food Technology Education Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-on-surface mb-4 leading-tight"
          >
            From Classroom to{" "}
            <span className="text-secondary-container bg-primary px-3 py-1 rounded-lg inline-block">
              Factory Floor
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-on-surface-variant mb-10 mt-4 leading-relaxed w-[75%]"
          >
            Bridge the gap between your food technology degree and real industry
            practice. Learn from Nestlé, ITC, Britannia, and 10+ leading food
            companies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link href="/courses">
              <Button className="bg-[#6440FB] text-white px-6 py-6 rounded-lg text-sm font-bold">
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Explore Courses
              </Button>
            </Link>
            <Link href="/internships">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary px-6 py-6 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary-fixed transition-all active:scale-95 group"
              >
                <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Browse Internships
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-4 items-center pb-4 border-b border-outline-variant">
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                10+ Industry Partners
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Paid Internships
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Govt-certified Workshops
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBmOJ88PoVeOUH13opkWEPYGzBR5Ww9tNWl2tm1nDnsUuquQayfntarjmIOsSnOc7xKlEKH9TelSrcx_D1QTzXBfdqVhRzb6j7MyYyV9jYAAdZ2Y9-MPdjLzegPBHogJoR_q1zoPb0ipEhec72VegaCV9jPWVlo4Smss4jlV64OpOlSxpIuWwrCkfJIq567Fbl0xSp4zwQ4nT-34plKulPLOI6qo6SDIIQX8_S0FPSdDyLNQvwdExdFG1STF8UnclPq6KFd8pWsFDE",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCNWW05uuqTe6y9b6ZhKW6l7KkHA9xVeP0jZJJc7WYhpKMM96cgQirYAcrjCvpMVIlLk4RH79_moy6SZ_IIxHsSPSqLBQGSmLWOmt5siyzOsMVeMwD-8dkETtJp1UpNEgQ8SedeKGQHZBAn7VMjvWQWMfTWAggut7g8SJ8lE4fcYNPkbb-Pr_QxLOsxGh2TMG24-dYu6tp90PMzrcp-GigN6gIgyED6R_zTIsGy1L3oRFhLamwqH28R-v4n88HXnwwfyez4vdHTzXY",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuA4FA5dzf0G_UGL0kxET8t6HGDcFZ-GQzCwKEZPxFjwc3h40qWCWdbrxjYr7HDlMx0_KpIFfybTUFMvJKImExBCrN2KY9Ia3WuDvIilYza7EwCSvA59pQsmZmdV2HsQNGUQn_Q3q-RosXqr2LK1Ue-aviAu-KlnQgCTBd3ak957xgYdjLcuePwdpfODI8ClTskNDE2JKpOyi9xnaWM1TWwTKs8MA109fvl6qgBQHljcgUYxz00PJIXE07r7erprYq2d2icqyUOOVNE",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAify8xfv_yCgISRHS1uEDZxOx8D532FHXZIe0wJCsspa9nIBFD7xeTlhygAh2eCygRe7eK8pjewFko9yS9txHyBVq1U1IgE-GrOTgSiKnCyDAjalLwQy0TF8UmASxfoid9uhKqynTbEqyMR451IfwAMDUYJiZUUBTeJmZamxlODLwSQYXlxCKYWcCAJQRE9pkb6gfYpGhBOoY2eHcvdoBgLXAzTCWXlB1ySCGQRy-Oy6AngKmcT5MTwQk5uD63cPz9AcXwAdfx_bo",
                ].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`user-${index}`}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-on-surface">
                  Join <span className="font-bold">2,400+</span> food technology
                  students
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                  <span className="text-xs text-on-surface ml-1">
                    4.8 rating
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN (45%) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:col-span-5 lg:flex relative items-center justify-center"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-primary-fixed rounded-[4rem] opacity-30 transform rotate-3"></div>
          <div className="absolute -top-20 -right-20 opacity-20">
            <MaterialIcon icon="stream" className="text-[200px] text-primary" />
          </div>

          {/* Main Card Cluster */}
          <div className="relative w-full py-12 px-4">
            {/* Main Course Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative z-20 bg-surface-container-lowest rounded-3xl p-4 shadow-lg mx-auto border border-outline-variant/30"
            >
              {/* Course Image */}
              <div className="relative w-full h-48 rounded-[10px] overflow-hidden mb-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpPbbcDSXWt_9-XFJkubPRjsZv4XVsF89DBzMJmPDonM5MxWgn45wDuvHn2drUhc2E6sYvHLBJT1P8yIPdwR0xwe69vfKTILehmF3nXQBKbH7S2hSDmB2qDWnKSq2aW8mhvurnM8GpKMA979-7hP2BLBjLRSS4hXdYbzuqoXRDSfPO5O-QeWH1DOvXAm8qX8tsKI-Apbh5LR9gsnwERXJJBi_J-acDz0e9tpagQS2j228Nhz_JNPIlDW-T4viIsnWZBojA_FIh9-k"
                  alt="Dairy Processing"
                  className="object-cover"
                />
              </div>

              {/* Popular Badge */}
              <div className="absolute top-6 right-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                Popular
              </div>

              {/* Course Title */}
              <h3 className="text-2xl font-bold text-on-surface mb-2 leading-tight">
                Industrial Dairy Processing
              </h3>

              {/* Instructor & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                    P
                  </div>
                  <span className="text-sm text-on-surface-variant">
                    Dr. Priya Nair
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-bold text-sm">4.7</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-on-surface-variant">
                    Progress
                  </span>
                  <span className="text-xs font-bold text-primary">65%</span>
                </div>
                <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%]"></div>
                </div>
              </div>

              {/* CTA Button */}
              <Button className="w-full py-2 bg-primary text-on-primary font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                Continue Learning
                <span>→</span>
              </Button>
            </motion.div>

            {/* Floating Card 1: Internship */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -left-8 top-1/4 glass-card p-3 rounded-xl z-30 max-w-60 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-container/30 flex items-center justify-center rounded-lg flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-primary">
                    New Internship
                  </p>
                  <p className="text-sm font-semibold text-on-surface leading-tight">
                    QA Intern — Nestlé
                  </p>
                  <div className="flex justify-between items-center mt-3 gap-2">
                    <p className="text-sm font-bold text-primary">₹15,000/mo</p>
                    <button className="text-[10px] bg-primary text-on-primary px-2 py-1 rounded-full font-bold hover:opacity-90 transition">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Plant Visit */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -right-4 bottom-1/4 glass-card bg-white/60 p-3 rounded-xl z-30 max-w-56 shadow-lg"
            >
              <div className="space-y-2 space-x-4">
                <div className="flex items-center gap-2">
                  <span className="text-primary">🏭</span>
                  <span className="text-sm text-on-surface-variant">
                    Plant Visit
                  </span>
                </div>
                <p className="font-bold text-on-surface text-md">
                  Britannia Factory
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-on-surface-variant">Jun 21</p>
                  <div className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold">
                    10 seats left
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Placement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="absolute right-0 top-10 bg-primary text-on-primary w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg z-30 border-4 border-surface"
            >
              <span className="text-3xl font-bold leading-none">94%</span>
              <span className="text-[10px] uppercase font-bold text-center leading-tight">
                Placement Rate
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
