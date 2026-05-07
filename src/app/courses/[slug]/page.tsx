'use client';

import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Star, Check, BookOpen, ChevronDown } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { LoginRequiredModal } from "@/components/auth/LoginRequiredModal";
import { PaymentModal } from "@/components/modals/PaymentModal";
import { useAuthStore } from "@/lib/stores/auth.store";
import { courses, featuredCourseSlug } from "@/lib/course-data";

export default function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(0);
  const { isAuthenticated } = useAuthStore();

  const course =
    courses.find((item) => item.slug === slug) ??
    courses.find((item) => item.slug === featuredCourseSlug);

  if (!course) {
    notFound();
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const discount = course.originalPrice
    ? Math.round(
        (1 - parseInt(course.price.replace(/[₹,]/g, "")) /
             parseInt(course.originalPrice.replace(/[₹,]/g, ""))) * 100
      )
    : 0;

  return (
    <main className="min-h-screen bg-background">
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login to Enroll"
        description="Please login to your account to enroll in this course and access all learning materials."
      />
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        courseTitle={course.title}
        price={course.price}
        instructor={course.instructor.name}
        onProceed={() => {
          console.log('Payment proceeded for course:', course.title);
          setShowPaymentModal(false);
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-visible bg-gradient-to-br from-primary-600 via-primary-500 to-tertiary-500 -mt-20">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-28 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Content */}
            <div className="flex-1 text-white pr-8">
              <div className="flex gap-3 mb-5 flex-wrap">
                <span className="inline-block px-3 py-1.5 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                  {course.category}
                </span>
                <span className="inline-block px-3 py-1.5 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                  {course.level}
                </span>
                {course.badge && (
                  <span className="inline-block px-3 py-1.5 bg-secondary-400/20 text-secondary-100 text-xs font-bold uppercase tracking-wider rounded-full border border-secondary-400/30">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-white/80 mb-6 leading-relaxed max-w-2xl">
                {course.overview}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={course.instructor.picture}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
                <span className="text-sm text-white/80">
                  Created by{' '}
                  <span className="text-white font-semibold">{course.instructor.name}</span>
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 5 ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-300 font-semibold">4.8</span>
                  <span className="text-white/70">(12k reviews)</span>
                </div>
                <span className="text-white/70">
                  <span className="text-white font-semibold">8.5K+</span> students
                </span>
                <span className="text-white/70">
                  <span className="text-white font-semibold">{course.duration}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Card - Overlapping Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:-mt-64 mb-12 ">
        <div className="w-full lg:w-96 ml-auto">
          <div className="sticky top-24">
            <div className="pt-12 md:pt-0 md:bg-card md:rounded-xl md:overflow-hidden md:shadow-lg md:border border-border">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-56 object-cover"
              />
              <div className="md:p-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {course.originalPrice}
                      </span>
                      <span className="text-sm font-bold bg-secondary-100 text-secondary-900 px-3 py-1 rounded">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap mb-6">
                  {[
                    { label: course.duration },
                    { label: course.level },
                    { label: '4 modules' }
                  ].map((item, i) => (
                    <span key={i} className="text-sm bg-muted text-muted-foreground px-3 py-1.5 rounded border border-border">
                      {item.label}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-all mb-3 active:scale-95 text-base"
                >
                  Enroll Now
                </button>

                <button className="w-full py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-all text-base">
                  Try for Free
                </button>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  30-day money-back guarantee • Lifetime access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:-mt-84">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-5">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Master HACCP principles and food safety frameworks",
                  "Conduct internal audits and GMP compliance reviews",
                  "Write non-conformance reports and CAPA documents",
                  "Apply root cause analysis techniques",
                  "Design HACCP plans for product launches",
                  "Prepare facilities for third-party audits"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <Check size={18} className="text-secondary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-5">
                Course content
              </h2>
              <div className="space-y-2">
                {[
                  {
                    title: 'Foundations of Food Safety Management',
                    description: 'Learn the fundamentals of food safety systems, including regulatory frameworks and prerequisite programs essential for food production',
                    lessons: 3,
                    duration: '105 mins',
                    details: [
                      {
                        title: 'Food safety management systems overview',
                        description: 'Introduction to comprehensive food safety management approaches and their importance in modern food production facilities'
                      },
                      {
                        title: 'GMP and GHP as prerequisite programs',
                        description: 'Understanding Good Manufacturing Practices (GMP) and Good Hygiene Practices (GHP) as foundational requirements for food safety'
                      },
                      {
                        title: 'ISO 22000 vs FSSC 22000 vs BRC',
                        description: 'Comparative analysis of major food safety certification standards and their specific requirements and applications'
                      }
                    ]
                  },
                  {
                    title: 'HACCP Principles in Depth',
                    description: 'Master the Hazard Analysis and Critical Control Points methodology, the cornerstone of modern food safety management',
                    lessons: 5,
                    duration: '175 mins',
                    details: [
                      {
                        title: 'Hazard analysis: biological, chemical, physical',
                        description: 'Comprehensive identification and assessment of potential hazards that could contaminate food products at any stage'
                      },
                      {
                        title: 'Determining critical control points (CCPs)',
                        description: 'Learn how to identify and evaluate critical control points where hazards can be prevented, eliminated, or reduced to acceptable levels'
                      },
                      {
                        title: 'Setting critical limits and monitoring procedures',
                        description: 'Establish measurable critical limits for each CCP and implement effective monitoring and documentation procedures'
                      }
                    ]
                  },
                  {
                    title: 'Internal Auditing and Non-Conformance',
                    description: 'Develop skills to conduct effective internal audits, document non-conformances, and implement corrective actions',
                    lessons: 4,
                    duration: '155 mins',
                    details: [
                      {
                        title: 'Planning and conducting internal audits',
                        description: 'Systematic approach to planning, executing, and documenting internal audits to verify food safety system compliance'
                      },
                      {
                        title: 'Writing non-conformance reports (NCRs)',
                        description: 'Proper documentation of deviations from standards, including detailed descriptions and evidence of non-compliance'
                      },
                      {
                        title: 'Root cause analysis tools: 5-Why, fishbone',
                        description: 'Apply proven analytical techniques to identify underlying causes of non-conformances and develop effective corrective actions'
                      }
                    ]
                  },
                ].map((section, i) => (
                  <div key={i} className="border border-border rounded-lg overflow-hidden bg-card">
                    <button
                      onClick={() => setExpandedSection(expandedSection === i ? -1 : i)}
                      className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground text-sm">{section.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {section.description}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {section.lessons} lessons • {section.duration}
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-muted-foreground transition-transform flex-shrink-0 ${expandedSection === i ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {expandedSection === i && (
                      <div className="px-4 pb-3 border-t border-border space-y-3">
                        {section.details.map((detail, j) => (
                          <div key={j} className="py-1.5">
                            <div className="flex gap-3 mb-1.5">
                              <BookOpen size={14} className="text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm font-medium text-foreground">{typeof detail === 'string' ? detail : detail.title}</span>
                            </div>
                            {typeof detail !== 'string' && (
                              <div className="ml-6 text-xs text-muted-foreground leading-relaxed">
                                {detail.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                Description
              </h2>
              <p className="text-foreground text-sm leading-relaxed">
                {course.overview} Food safety is not optional – it is the foundation of every successful food business. This intermediate-level course gives you a thorough grounding in HACCP methodology, GMP auditing, and the compliance frameworks that govern food production globally.
              </p>
            </section>

            {/* Requirements */}
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {[
                  "Basic knowledge of food processing or manufacturing operations",
                  "Familiarity with food regulations is helpful but not mandatory",
                  "Ability to read and interpret process flow diagrams",
                  "Minimum 6 months of work experience in food industry preferred"
                ].map((req, i) => (
                  <li key={i} className="flex gap-3 text-foreground text-sm">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Who this course is for */}
            <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Who this course is for
              </h2>
              <ul className="space-y-2">
                {[
                  "Quality assurance and quality control executives",
                  "Production supervisors and plant managers",
                  "Food safety consultants and auditors",
                  "Students pursuing careers in food technology",
                  "Restaurant and catering managers"
                ].map((who, i) => (
                  <li key={i} className="flex gap-3 text-foreground text-sm">
                    <span className="text-primary">✓</span>
                    <span>{who}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructor Card - Horizontal Layout */}
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-5">
                Your instructor
              </h2>
              <div className="flex gap-5">
                {/* Image on Left */}
                <img
                  src={course.instructor.picture}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-border flex-shrink-0"
                />

                {/* Data on Right */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{course.instructor.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{course.instructor.title}</p>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: 'Rating', value: course.instructor.rating.toFixed(1) },
                      { label: 'Reviews', value: (course.instructor.reviews / 1000).toFixed(0) + 'K+' },
                      { label: 'Students', value: (course.instructor.students / 1000).toFixed(0) + 'K+' },
                      { label: 'Courses', value: course.instructor.courses }
                    ].map((stat, i) => (
                      <div key={i} className="text-left">
                        <div className="font-bold text-foreground text-xs">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
