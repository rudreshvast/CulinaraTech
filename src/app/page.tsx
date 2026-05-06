import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Factory,
  Building2,
  Clock,
  Star,
  TrendingUp,
  FlaskConical,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { courses, internships, workshops, industrialVisits, jobs } from '@/lib/data';
import { HeroSection } from '@/components/homepage/HeroSection';
import { StatPill } from '@/components/homepage/StatPill';
import { CourseCard } from '@/components/homepage/CourseCard';
import { InternshipCard } from '@/components/homepage/InternshipCard';
import { WorkshopCard } from '@/components/homepage/WorkshopCard';
import { JobCard } from '@/components/homepage/JobCard';
import Navbar from '@/components/ui/navbar';

export const metadata: Metadata = {
  title: 'CulinaraTech - Food Processing Career Platform',
  description:
    "India's #1 food processing education and career platform. Courses, internships, workshops, and job opportunities in the food processing industry.",
};

export default function HomePage() {
  // Derive stats from data
  const courseCount = courses.length;
  const internshipCount = internships.length;
  const trainingCount = workshops.length + industrialVisits.length;
  const jobCount = jobs.length;

  // Filter courses with badges and sort
  const badgePriority: Record<string, number> = { Hot: 0, Popular: 1, Trending: 2, New: 3, Quick: 4, Expert: 5, Premium: 6 };
  const featuredCourses = courses
    .filter((c) => c.badge)
    .sort((a, b) => (badgePriority[a.badge!] ?? 999) - (badgePriority[b.badge!] ?? 999))
    .slice(0, 6);

  // Featured internships and jobs
  const featuredInternships = internships.filter((i) => i.featured).slice(0, 3);
  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 3);

  // Next workshops and industrial visits sorted by date
  const nextWorkshops = workshops.slice(0, 2);
  const nextVisits = industrialVisits.slice(0, 2);

  // Testimonials from workshops and visits
  const allTestimonials = [
    ...(workshops.flatMap((w) => w.testimonials || []) || []),
    ...(industrialVisits.flatMap((v) => v.testimonials || []) || []),
  ].slice(0, 3);

  // Unique companies across all data
  const uniqueCompanies = Array.from(
    new Set([
      ...courses.map((c) => c.partner),
      ...internships.map((i) => i.company),
      ...workshops.map((w) => w.organizer),
      ...industrialVisits.map((v) => v.company),
      ...jobs.map((j) => j.company),
    ]),
  );

  return (
    <div className="w-full">
      <Navbar/>
      {/* SECTION 1: HERO SECTION */}
      <HeroSection />

      {/* SECTION 2: PLATFORM NAVIGATION TILES */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-2">Everything you need to grow in food processing</h2>
          <p className="text-muted-foreground text-lg mb-12">Build skills and find opportunities in one place</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Courses */}
            <Link
              href="/courses"
              className="bg-card border border-border rounded-2xl p-6 hover:border-secondary-300 hover:shadow-lg transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <GraduationCap className="w-10 h-10 text-secondary-500" />
                <ArrowRight className="w-5 h-5 text-secondary-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Courses</h3>
              <p className="text-secondary-500 font-semibold mb-3">{courseCount} available</p>
              <p className="text-muted-foreground text-sm">Self-paced courses taught by industry experts</p>
            </Link>

            {/* Card 2: Internships */}
            <Link
              href="/internships"
              className="bg-card border border-border rounded-2xl p-6 hover:border-orange-300 hover:shadow-lg transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="w-10 h-10" style={{ color: 'rgb(234, 88, 12)' }} />
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" style={{ color: 'rgb(234, 88, 12)' }} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Internships</h3>
              <p className="font-semibold mb-3" style={{ color: 'rgb(234, 88, 12)' }}>
                {internships.filter((i) => i.featured).length} featured
              </p>
              <p className="text-muted-foreground text-sm">Paid internships at top food companies</p>
            </Link>

            {/* Card 3: Training */}
            <Link
              href="/training"
              className="bg-card border border-border rounded-2xl p-6 hover:border-amber-300 hover:shadow-lg transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <Factory className="w-10 h-10" style={{ color: 'rgb(217, 119, 6)' }} />
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" style={{ color: 'rgb(217, 119, 6)' }} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Training</h3>
              <p className="font-semibold mb-3" style={{ color: 'rgb(217, 119, 6)' }}>
                {trainingCount} programs
              </p>
              <p className="text-muted-foreground text-sm">Workshops and industrial plant visits</p>
            </Link>

            {/* Card 4: Jobs */}
            <Link
              href="/opportunities"
              className="bg-card border border-border rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <Building2 className="w-10 h-10 text-primary-500" />
                <ArrowRight className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Jobs</h3>
              <p className="text-primary-500 font-semibold mb-3">{jobCount} open roles</p>
              <p className="text-muted-foreground text-sm">Full-time roles at leading food companies</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED COURSES */}
      <section className="py-16 md:py-24 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">Popular Courses</h2>
            <Link href="/courses" className="text-primary-500 hover:text-primary-400 font-semibold flex items-center gap-2">
              View all courses <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 pb-2">
              {featuredCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OPEN INTERNSHIPS */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">Open Internships</h2>
            <Link href="/internships" className="text-primary-500 hover:text-primary-400 font-semibold flex items-center gap-2">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map((internship) => (
              <InternshipCard key={internship.slug} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: UPCOMING TRAINING */}
      <section className="py-16 md:py-24 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">Upcoming Training</h2>
            <Link href="/training" className="text-primary-500 hover:text-primary-400 font-semibold flex items-center gap-2">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Workshops Column */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Workshops</h3>
              <div className="space-y-4">
                {nextWorkshops.map((workshop) => (
                  <WorkshopCard key={workshop.slug} workshop={workshop} />
                ))}
              </div>
            </div>

            {/* Industrial Visits Column */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Plant Visits</h3>
              <div className="space-y-4">
                {nextVisits.map((visit) => (
                  <Link
                    key={visit.slug}
                    href={`/training/${visit.slug}`}
                    className="flex gap-4 bg-background border border-border rounded-lg p-4 hover:border-primary-200 hover:shadow-md transition group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={visit.image}
                        alt={visit.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary-500 transition">
                          {visit.title}
                        </h4>
                        <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded whitespace-nowrap">
                          {visit.facility_type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{visit.company}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{visit.visitDate}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-secondary-600">₹{visit.fee}</span>
                        {visit.transportAvailable && (
                          <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">Transport included</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LATEST JOB OPPORTUNITIES */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">Latest Job Openings</h2>
            <Link href="/opportunities" className="text-primary-500 hover:text-primary-400 font-semibold flex items-center gap-2">
              View all jobs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CULINARATECH */}
      <section className="py-16 md:py-24 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why choose CulinaraTech</h2>
            <p className="text-muted-foreground text-lg">Built for food industry professionals, by food industry professionals</p>
          </div>

          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600"
                  alt="Industry partnerships"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <Building2 className="w-12 h-12 text-secondary-500 mb-4" />
                <h3 className="text-3xl font-bold text-foreground mb-4">Learn from real industry partners</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Our courses and training programs are developed with companies like Nestlé, ITC Foods, Britannia, Adani Wilmar, and McCain Foods &mdash; so you learn what actually happens on the factory floor.
                </p>
                <div className="inline-block bg-secondary-100 text-secondary-700 font-semibold px-4 py-2 rounded-full text-sm">
                  {uniqueCompanies.length}+ partner companies
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2 relative h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600"
                  alt="Industrial facilities"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="md:order-1">
                <FlaskConical className="w-12 h-12 mb-4" style={{ color: 'rgb(217, 119, 6)' }} />
                <h3 className="text-3xl font-bold text-foreground mb-4">Get inside real food processing plants</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Our industrial visit program gives you rare access to live dairy, beverage, oil refinery, frozen food, bakery, and spice processing facilities &mdash; not just textbook diagrams.
                </p>
                <div className="inline-block bg-amber-100 text-amber-700 font-semibold px-4 py-2 rounded-full text-sm">
                  {industrialVisits.length} plant visits available
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600"
                  alt="Career growth"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <TrendingUp className="w-12 h-12 text-primary-500 mb-4" />
                <h3 className="text-3xl font-bold text-foreground mb-4">From learning to earning</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Internships paying up to ₹20,000/month, full-time roles up to ₹38 LPA, and workshops that earn you government-recognized certificates. Your career path starts here.
                </p>
                <div className="inline-block bg-primary-100 text-primary-700 font-semibold px-4 py-2 rounded-full text-sm">
                  ₹13,000–₹20,000/month internship stipends
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PARTNER LOGO STRIP */}
      <section className="py-16 md:py-24 px-4 bg-background overflow-hidden">
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-muted-foreground">{`Trusted by India's leading food companies`}</h3>
        </div>

        <div className="space-y-6">
          {/* Row 1 */}
          <div className="flex gap-4 overflow-hidden">
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .scroll-animation {
                animation: scroll 40s linear infinite;
              }
              .scroll-animation:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="scroll-animation flex gap-4 whitespace-nowrap">
              {[...uniqueCompanies, ...uniqueCompanies].map((company, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground flex-shrink-0"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Offset) */}
          <div className="flex gap-4 overflow-hidden">
            <div className="scroll-animation flex gap-4 whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
              {[...uniqueCompanies, ...uniqueCompanies].map((company, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center px-4 py-2 bg-muted border border-border rounded-full text-sm font-medium text-muted-foreground flex-shrink-0"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      {allTestimonials.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-card">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground text-center mb-4">What our community says</h2>
            <p className="text-muted-foreground text-center mb-12">Real feedback from students and professionals</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allTestimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-background border border-border rounded-2xl p-8">
                  <div className="text-5xl text-muted-foreground mb-4 leading-none">&quot;</div>
                  <p className="italic text-foreground mb-6 text-lg">{testimonial.quote}</p>
                  <div className="border-t border-border pt-6">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {(testimonial as { college?: string; company?: string }).college ||
                       (testimonial as { college?: string; company?: string }).company}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: BOTTOM CTA BAND */}
      <section className="py-16 md:py-24 px-4 bg-foreground text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Section */}
            <div className="md:border-r border-white/20 md:pr-12">
              <div className="inline-block bg-secondary-600 text-white font-semibold text-xs px-3 py-1 rounded-full mb-4">
                For students & professionals
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your food processing career?</h3>
              <p className="text-white/80 mb-8">
                Browse courses, apply for internships, and register for workshops — all in one place.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Get started for free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Right Section */}
            <div className="md:pl-12">
              <div className="inline-block bg-primary-600 text-white font-semibold text-xs px-3 py-1 rounded-full mb-4">
                For companies & institutes
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Partner with CulinaraTech</h3>
              <p className="text-white/80 mb-8">
                Post internships, list job openings, or host industrial visits for our community of food technology professionals.
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 border border-white text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Post an opportunity <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
