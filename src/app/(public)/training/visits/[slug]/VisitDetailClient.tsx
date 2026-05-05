'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  CalendarDays,
  Users,
  Clock,
  Bus,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Microscope,
  Mail,
  Phone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IndustrialVisit } from '@/lib/data/industrial-visits';
import { Course } from '@/data/courses';
import ApplyModal from '@/components/shared/ApplyModal';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { useAuthStore } from '@/lib/stores/auth.store';

interface VisitDetailClientProps {
  visit: IndustrialVisit;
  relatedCourses: (Course | undefined)[];
  formatDate: (dateStr: string) => string;
  isClosingSoon: (deadline: string) => boolean;
}

export default function VisitDetailClient({
  visit,
  relatedCourses,
  formatDate,
  isClosingSoon,
}: VisitDetailClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-600 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {visit.category}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {visit.duration}
                </Badge>
                <Badge className="bg-amber-500 text-white border-0">
                  {visit.badge}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {visit.title}
              </h1>

              {/* Company */}
              <p className="text-xl font-semibold text-teal-100">
                {visit.company}
              </p>

              {/* Overview */}
              <p className="text-lg leading-relaxed text-teal-50 max-w-2xl">
                {visit.overview}
              </p>

              {/* Meta Row */}
              <div className="space-y-2 pt-4 border-t border-white/20">
                <div className="flex flex-wrap gap-6 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    {visit.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 flex-shrink-0" />
                    {formatDate(visit.visitDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 flex-shrink-0" />
                    {visit.groupSize}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    {visit.duration}
                  </div>
                </div>
              </div>

              {/* Transport Info */}
              {visit.transportAvailable && (
                <div className="rounded-lg bg-cyan-500/20 border border-cyan-300/50 p-3 flex items-start gap-2">
                  <Bus className="h-5 w-5 text-cyan-200 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-cyan-50">
                    Transport available from: <span className="font-semibold">{visit.transportFrom}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Right Sidebar - Registration Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="p-6 space-y-4">
                  {/* Fee */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Visit Fee
                    </p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-4xl font-bold text-green-600">
                        {visit.fee.split('/')[0]}
                      </p>
                      <p className="text-sm text-muted-foreground">/person</p>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Visit Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Visit Date
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatDate(visit.visitDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Reporting Time
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {visit.reportingTime}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Registration Deadline
                      </p>
                      <p className={`text-sm font-semibold ${isClosingSoon(visit.registrationDeadline) ? 'text-red-600' : 'text-foreground'}`}>
                        {formatDate(visit.registrationDeadline)}
                        {isClosingSoon(visit.registrationDeadline) && ' ⚠️'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Seats Remaining
                      </p>
                      <p className={`text-sm font-bold ${visit.seatsLeft < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {visit.seatsLeft} seats left
                      </p>
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            visit.seatsLeft < 10 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${((parseInt(visit.groupSize.split('–')[1]) - visit.seatsLeft) / parseInt(visit.groupSize.split('–')[1])) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Button */}
                  <Button
                    onClick={handleRegisterClick}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    size="lg"
                  >
                    Register Now
                  </Button>

                  <div className="border-t border-border" />

                  {/* Contact Info */}
                  <a
                    href={`mailto:${visit.contactEmail}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {visit.contactEmail}
                  </a>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">What's Included</p>
                    <ul className="space-y-2">
                      {visit.includes.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
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
          {/* Section 1: About the Visit */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">About the Visit</h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-4">{visit.overview}</p>
            <h3 className="font-semibold text-foreground mb-3">What You Will See</h3>
            <p className="text-base leading-relaxed text-muted-foreground">{visit.aboutCompany}</p>
          </section>

          {/* Section 2: Itinerary */}
          <section>
            <h2 className="mb-8 text-2xl font-bold text-foreground">Day Schedule</h2>
            <div className="space-y-6">
              {visit.itinerary.map((item, idx) => (
                <div key={idx} className={`flex gap-6 pb-6 ${idx !== visit.itinerary.length - 1 ? 'border-b border-border' : ''}`}>
                  {/* Time Bubble */}
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-white font-semibold text-xs text-center">
                      {item.time}
                    </div>
                  </div>
                  {/* Activity */}
                  <div className="flex-1 pt-2">
                    <p className="text-base font-medium text-foreground">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Learning Highlights */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">What You Will Learn</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {visit.learningHighlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-3 items-start p-4 rounded-lg bg-muted/30">
                  <Microscope className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Safety & Eligibility */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Eligibility & Safety</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Eligibility Card */}
              <Card className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Who Can Apply</h3>
                    <p className="text-sm text-muted-foreground">{visit.eligibility}</p>
                  </div>
                </div>
              </Card>

              {/* Safety Card */}
              <Card className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">Safety Requirements</h3>
                  </div>
                  {visit.safetyRequirements && visit.safetyRequirements.length > 0 ? (
                    <ul className="space-y-2">
                      {visit.safetyRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-amber-600 font-bold mt-0.5">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Standard safety protocols will be briefed on-site.</p>
                  )}
                </div>
              </Card>
            </div>
          </section>

          {/* Section 5: What's Included */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Included in the Fee</h2>
            <div className="grid gap-3">
              {visit.includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: About the Company */}
          <section className="rounded-lg bg-card border border-border p-8">
            <div className="flex gap-6 items-start mb-6">
              {visit.companyLogo && (
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={visit.companyLogo}
                    alt={visit.company}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{visit.company}</h3>
                <p className="text-sm text-muted-foreground mb-4">Plant: {visit.plantAddress}</p>
                <a
                  href={visit.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <MapPin className="h-4 w-4" />
                  View on Map
                </a>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{visit.aboutCompany}</p>
          </section>

          {/* Section 7: Gallery */}
          {visit.galleryImages && visit.galleryImages.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Past Visit Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {visit.galleryImages.map((image, idx) => (
                  <div key={idx} className="relative h-48 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={`Visit gallery ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 8: Testimonials */}
          {visit.testimonials && visit.testimonials.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Participant Testimonials</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {visit.testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="p-4">
                    <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.college}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Section 9: Related Courses */}
          {relatedCourses.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Related Courses</h2>
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
          <section className="rounded-lg bg-gradient-to-r from-teal-100 to-cyan-100 p-8 text-center border border-teal-200">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Visit?</h2>
            <p className="mb-6 text-muted-foreground max-w-lg mx-auto">
              Register now to secure your spot and gain hands-on insights into real food processing operations.
            </p>
            <Button
              onClick={handleRegisterClick}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base"
            >
              Register Now
            </Button>
          </section>
        </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login Required"
        description="Please login to your account to register for this industrial visit."
      />

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        type="visit"
        title={visit.title}
        company={visit.company}
        location={visit.location}
        applyLink={visit.registrationLink}
        applyEmail={visit.contactEmail}
      />
    </div>
  );
}
