'use client';

import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Star, Check, Play } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { LoginRequiredModal } from "@/components/auth/LoginRequiredModal";
import { useAuthStore } from "@/lib/stores/auth.store";
import { courses, featuredCourseSlug } from "@/lib/course-data";

export default function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    console.log('Enrolling in course:', course.title);
  };

  const discount = course.originalPrice
    ? Math.round(
        (1 - parseInt(course.price.replace(/[₹,]/g, "")) /
             parseInt(course.originalPrice.replace(/[₹,]/g, ""))) * 100
      )
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-background">
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login to Enroll"
        description="Please login to your account to enroll in this course and access all learning materials."
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Content */}
            <div className="flex-1 text-white">
              <div className="flex gap-3 mb-6 flex-wrap">
                <span className="inline-block px-3 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-400/30">
                  {course.category}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: `#1e40af22`,
                  color: '#60a5fa',
                  border: '1px solid #0c4a6e',
                }} className="inline-block uppercase tracking-wider">
                  {course.level}
                </span>
                {course.badge && (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: '#f59e0b22',
                    color: '#fbbf24',
                    border: '1px solid #92400e',
                  }} className="inline-block uppercase tracking-wider">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl">
                {course.overview}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-8">
                <img
                  src={course.instructor.picture}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400/50"
                />
                <span className="text-sm text-slate-300">
                  Created by{' '}
                  <span className="text-blue-300 font-semibold">{course.instructor.name}</span>
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-500'}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-300 font-semibold">4.8</span>
                  <span className="text-slate-400">(12k reviews)</span>
                </div>
                <span className="text-slate-400">
                  <span className="text-slate-300 font-semibold">8.5K+</span> students
                </span>
                <span className="text-slate-400">
                  <span className="text-slate-300 font-semibold">{course.duration}</span>
                </span>
              </div>
            </div>

            {/* Right: Price Card */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <>
                        <span className="text-sm text-slate-500 line-through">
                          {course.originalPrice}
                        </span>
                        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded">
                          {discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap mb-4">
                    {[
                      { label: course.duration },
                      { label: course.level },
                      { label: '4 modules' }
                    ].map((item, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded border border-slate-200">
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all mb-3 active:scale-95"
                  >
                    Enroll Now
                  </button>

                  <button className="w-full py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all">
                    Try for Free
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-3">
                    30-day money-back guarantee • Lifetime access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Master HACCP principles and food safety frameworks",
                  "Conduct internal audits and GMP compliance reviews",
                  "Write non-conformance reports and CAPA documents",
                  "Apply root cause analysis techniques",
                  "Design HACCP plans for product launches",
                  "Prepare facilities for third-party audits"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Course content
              </h2>
              <div className="space-y-3">
                {[
                  {
                    title: 'Foundations of Food Safety Management',
                    lessons: 3,
                    duration: '105 mins',
                    details: ['Food safety management systems overview', 'GMP and GHP as prerequisite programs', 'ISO 22000 vs FSSC 22000 vs BRC']
                  },
                  {
                    title: 'HACCP Principles in Depth',
                    lessons: 5,
                    duration: '175 mins',
                    details: ['Hazard analysis: biological, chemical, physical', 'Determining critical control points (CCPs)', 'Setting critical limits and monitoring procedures']
                  },
                  {
                    title: 'Internal Auditing and Non-Conformance',
                    lessons: 4,
                    duration: '155 mins',
                    details: ['Planning and conducting internal audits', 'Writing non-conformance reports (NCRs)', 'Root cause analysis tools: 5-Why, fishbone']
                  },
                ].map((section, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedSection(expandedSection === i ? -1 : i)}
                      className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{section.title}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            {section.lessons} lessons • {section.duration}
                          </div>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-slate-400 transition-transform ${expandedSection === i ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>

                    {expandedSection === i && (
                      <div className="px-5 pb-4 border-t border-slate-100 space-y-2">
                        {section.details.map((detail, j) => (
                          <div key={j} className="flex gap-3 py-2">
                            <Play size={14} className="text-slate-400 flex-shrink-0 mt-1" />
                            <span className="text-sm text-slate-700">{detail}</span>
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
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Description
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {course.overview} Food safety is not optional – it is the foundation of every successful food business. This intermediate-level course gives you a thorough grounding in HACCP methodology, GMP auditing, and the compliance frameworks that govern food production globally.
              </p>
            </section>

            {/* Requirements */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-3">
                {[
                  "Basic knowledge of food processing or manufacturing operations",
                  "Familiarity with food regulations is helpful but not mandatory",
                  "Ability to read and interpret process flow diagrams",
                  "Minimum 6 months of work experience in food industry preferred"
                ].map((req, i) => (
                  <li key={i} className="flex gap-3 text-slate-700">
                    <span className="text-blue-600 text-lg flex-shrink-0">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Who this course is for */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Who this course is for
              </h2>
              <ul className="space-y-3">
                {[
                  "Quality assurance and quality control executives",
                  "Production supervisors and plant managers",
                  "Food safety consultants and auditors",
                  "Students pursuing careers in food technology",
                  "Restaurant and catering managers"
                ].map((who, i) => (
                  <li key={i} className="flex gap-3 text-slate-700">
                    <span className="text-blue-600">✓</span>
                    <span>{who}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Sidebar */}
          <div>
            {/* Instructor Card */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Your instructor
              </h2>
              <div className="text-center">
                <img
                  src={course.instructor.picture}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-3 border-slate-200"
                />
                <h3 className="font-bold text-slate-900 text-lg">{course.instructor.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{course.instructor.title}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  {[
                    { label: 'Rating', value: course.instructor.rating.toFixed(1) },
                    { label: 'Reviews', value: (course.instructor.reviews / 1000).toFixed(0) + 'K+' },
                    { label: 'Students', value: (course.instructor.students / 1000).toFixed(0) + 'K+' },
                    { label: 'Courses', value: course.instructor.courses }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.instructor.bio}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
