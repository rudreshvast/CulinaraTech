'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  Dot,
  Gift,
  BookOpen,
  Bookmark,
  Circle,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Internship } from '@/lib/types';
import { Course } from '@/data/courses';
import { ApplyModal } from '@/components/internships/ApplyModal';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { useAuthStore } from '@/lib/stores/auth.store';

interface InternshipDetailClientProps {
  internship: Internship;
  relatedCourses: (Course | undefined)[];
  formatDate: (dateStr: string) => string;
  isClosingSoon: (dateStr: string) => boolean;
  getBadgeColor: (badge: string) => string;
}

export default function InternshipDetailClient({
  internship,
  relatedCourses,
  formatDate,
  isClosingSoon,
  getBadgeColor,
}: InternshipDetailClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-green-900 to-emerald-800 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category and Badge Pills */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {internship.category}
                </Badge>
                <Badge className={`${getBadgeColor(internship.badge)} border-0`}>
                  {internship.badge}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {internship.title}
              </h1>

              {/* Company */}
              <div>
                <a
                  href={internship.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold hover:underline flex items-center gap-2"
                >
                  {internship.company}
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              {/* Overview */}
              <p className="text-lg leading-relaxed text-green-50 max-w-2xl">
                {internship.overview}
              </p>

              {/* Meta Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">{internship.locationType}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Starts {internship.startDate}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{internship.openings} openings available</span>
                </div>
              </div>

              {/* Posted and Deadline */}
              <div className="text-sm text-green-100 pt-4">
                Posted on {formatDate(internship.postedDate)} ·{' '}
                <span className={isClosingSoon(internship.lastDate) ? 'text-red-300 font-semibold' : ''}>
                  Apply by {formatDate(internship.lastDate)}
                  {isClosingSoon(internship.lastDate) && ' ⚠️'}
                </span>
              </div>
            </div>

            {/* Right Sidebar - Application Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <Card className="p-6 space-y-4">
                  {/* Stipend */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Stipend
                    </p>
                    <p className="text-3xl font-bold text-green-600">{internship.stipend}</p>
                    {internship.stipendNegotiable && (
                      <Badge variant="outline" className="mt-2">
                        Negotiable
                      </Badge>
                    )}
                  </div>

                  <div className="border-t border-border" />

                  {/* Info Rows */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Duration</p>
                        <p className="text-muted-foreground">{internship.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Location Type</p>
                        <p className="text-muted-foreground">{internship.locationType}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Start Date</p>
                        <p className="text-muted-foreground">{internship.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Openings</p>
                        <p className="text-muted-foreground">{internship.openings} positions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Department</p>
                        <p className="text-muted-foreground">{internship.department}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleApplyClick}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSaved(!isSaved)}
                      className="w-full"
                    >
                      <Bookmark
                        className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`}
                      />
                      {isSaved ? 'Saved' : 'Save Internship'}
                    </Button>
                  </div>

                  <div className="border-t border-border pt-4">
                    {/* Company Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={internship.companyLogo}
                            alt={internship.company}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{internship.company}</p>
                          <a
                            href={internship.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Visit Website →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="space-y-12">
          {/* Section 1: About the Internship */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">About the Internship</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {internship.overview}
            </p>
          </section>

          {/* Section 2: Day-to-Day Responsibilities */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Day-to-Day Responsibilities
            </h2>
            <ul className="space-y-3">
              {internship.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{responsibility}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Requirements */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Who Should Apply</h2>
            <div className="space-y-8">
              {/* Required Qualifications */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Required Qualifications</h3>
                <ul className="space-y-2">
                  {internship.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex gap-3 items-start"
                    >
                      <Dot className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferred Qualifications */}
              {internship.preferredQualifications.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Good to Have</h3>
                  <ul className="space-y-2">
                    {internship.preferredQualifications.map((pref, index) => (
                      <li
                        key={index}
                        className="flex gap-3 items-start"
                      >
                        <Dot className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{pref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: Skills */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Skills You'll Work With</h2>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          {/* Section 5: Perks & Benefits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">What You'll Get</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {internship.perks.map((perk, index) => (
                <div key={index} className="flex gap-3 items-start p-4 rounded-lg bg-muted/30">
                  <Gift className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{perk}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Application Process */}
          <section>
            <h2 className="mb-8 text-2xl font-bold text-foreground">How to Apply</h2>
            <div className="space-y-4">
              {internship.applicationProcess.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    {index < internship.applicationProcess.length - 1 && (
                      <div className="mt-2 h-8 w-0.5 bg-border" />
                    )}
                  </div>
                  <div className="pb-4 pt-1">
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: About the Company */}
          <section className="rounded-lg bg-muted/30 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={internship.companyLogo}
                  alt={internship.company}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-bold text-foreground">About {internship.company}</h2>
                <a
                  href={internship.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-muted-foreground leading-relaxed">
                  {internship.aboutCompany}
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Related Courses */}
          {relatedCourses.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Prepare for This Internship
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedCourses.map((course) =>
                  course ? (
                    <Link key={course.slug} href={`/courses/${course.slug}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-md cursor-pointer h-full">
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="mb-2 font-semibold text-foreground line-clamp-2 group-hover:text-primary">
                            {course.title}
                          </h3>
                          <div className="mb-3 flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                            <span className="font-semibold text-green-600">{course.price}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{course.instructor}</p>
                        </div>
                      </Card>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="rounded-lg bg-gradient-to-r from-secondary/10 to-tertiary/10 p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Apply?</h2>
            <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
              Submit your application and start your journey with {internship.company}. We review applications on a rolling basis.
            </p>
            <Button
              onClick={handleApplyClick}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-base"
            >
              Apply Now
            </Button>
          </section>
        </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login Required"
        description="Please login to your account to apply for this internship."
      />

      {/* Apply Modal */}
      <ApplyModal
        open={isApplyModalOpen}
        onOpenChange={setIsApplyModalOpen}
        internshipTitle={internship.title}
        company={internship.company}
        location={internship.location}
        applyLink={internship.applyLink}
      />
    </div>
  );
}
