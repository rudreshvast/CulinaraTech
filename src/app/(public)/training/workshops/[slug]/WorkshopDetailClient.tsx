'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  ExternalLink,
  CheckCircle2,
  Users,
  Info,
  Award,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  Check,
  Phone,
  Mail,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Workshop } from '@/lib/data/workshops';
import { Course } from '@/data/courses';
import ApplyModal from '@/components/shared/ApplyModal';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { useAuthStore } from '@/lib/stores/auth.store';

interface WorkshopDetailClientProps {
  workshop: Workshop;
  relatedCourses: (Course | undefined)[];
  formatDate: (dateStr: string) => string;
  getBadgeColor: (badge: string) => string;
  isClosingSoon: (deadline: string) => boolean;
}

export default function WorkshopDetailClient({
  workshop,
  relatedCourses,
  formatDate,
  getBadgeColor,
  isClosingSoon,
}: WorkshopDetailClientProps) {
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
      <div className="relative bg-gradient-to-br from-amber-900 via-orange-700 to-amber-600 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {workshop.category}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {workshop.level}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {workshop.mode}
                </Badge>
                <Badge className={`${getBadgeColor(workshop.badge)} border-0`}>
                  {workshop.badge}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {workshop.title}
              </h1>

              {/* Organizer */}
              <a
                href={workshop.organizerWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xl font-semibold hover:underline"
              >
                {workshop.organizer}
                <ExternalLink className="h-5 w-5" />
              </a>

              {/* Overview */}
              <p className="text-lg leading-relaxed text-amber-50 max-w-2xl">
                {workshop.overview}
              </p>

              {/* Date, Duration, Location */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-lg">
                      {formatDate(workshop.date)} – {formatDate(workshop.endDate)} · {workshop.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-semibold">{workshop.location}</p>
                    <p className="text-sm text-amber-100">{workshop.venue}</p>
                  </div>
                </div>
              </div>

              {/* Seats Urgency Bar */}
              {workshop.seatsLeft < 15 && (
                <div className="rounded-lg bg-red-500/20 border border-red-400 p-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-300 flex-shrink-0" />
                  <span className="text-sm font-semibold text-red-100">
                    Only {workshop.seatsLeft} seats left - register soon!
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
                      Program Fee
                    </p>
                    <p className="text-4xl font-bold text-amber-600">{workshop.fee}</p>
                  </div>

                  {/* Early Bird */}
                  {workshop.earlyBirdFee && (
                    <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                      <p className="text-xs font-semibold text-green-800 mb-1">EARLY BIRD OFFER</p>
                      <p className="text-sm text-green-900">{workshop.earlyBirdFee}</p>
                    </div>
                  )}

                  <div className="border-t border-border" />

                  {/* Registration Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Registration Deadline
                      </p>
                      <p className={`text-sm font-semibold ${isClosingSoon(workshop.registrationDeadline) ? 'text-red-600' : 'text-foreground'}`}>
                        {formatDate(workshop.registrationDeadline)}
                        {isClosingSoon(workshop.registrationDeadline) && ' ⚠️'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Seats Remaining
                      </p>
                      <p className={`text-sm font-bold ${workshop.seatsLeft < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {workshop.seatsLeft} of {workshop.seats} seats
                      </p>
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            workshop.seatsLeft < 10 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${((workshop.seats - workshop.seatsLeft) / workshop.seats) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleRegisterClick}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      size="lg"
                    >
                      Register Now
                    </Button>
                    {workshop.brochureLink && workshop.brochureLink !== '#' && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={workshop.brochureLink} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download Brochure
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="border-t border-border" />

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <a
                      href={`mailto:${workshop.contactEmail}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {workshop.contactEmail}
                    </a>
                    <a
                      href={`tel:${workshop.contactPhone}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {workshop.contactPhone}
                    </a>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">What's Included</p>
                    <ul className="space-y-2">
                      {workshop.feeIncludes.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
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
          {/* Section 1: Overview */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">About This Workshop</h2>
            <p className="text-base leading-relaxed text-muted-foreground">{workshop.overview}</p>
          </section>

          {/* Section 2: Agenda */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Workshop Agenda</h2>
            <Accordion type="single" collapsible defaultValue="day-0" className="space-y-3">
              {workshop.agenda.map((agendaItem, idx) => (
                <AccordionItem key={idx} value={`day-${idx}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{agendaItem.day}</p>
                      <p className="text-sm text-muted-foreground">{agendaItem.title}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2">
                      {agendaItem.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Section 3: Learning Outcomes */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Learning Outcomes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {workshop.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex gap-3 items-start p-4 rounded-lg bg-muted/30">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Who Should Attend */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Who Should Attend</h2>
            <ul className="space-y-3">
              {workshop.whoShouldAttend.map((audience, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{audience}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: Prerequisites */}
          {workshop.prerequisites && workshop.prerequisites.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Prerequisites</h2>
              <ul className="space-y-3">
                {workshop.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{prereq}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section 6: Certificate */}
          <section className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-8 border border-amber-200">
            <div className="text-center">
              <Award className="h-16 w-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{workshop.certificate.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Issued by: <span className="font-semibold text-foreground">{workshop.certificate.issuedBy}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Recognized by: <span className="font-semibold text-foreground">{workshop.certificate.recognizedBy}</span>
              </p>
            </div>
          </section>

          {/* Section 7: Facilitators */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Your Facilitators</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {workshop.facilitators.map((facilitator, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={facilitator.picture}
                      alt={facilitator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{facilitator.name}</p>
                    <p className="text-sm text-muted-foreground">{facilitator.designation}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {facilitator.experience}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Testimonials */}
          {workshop.testimonials.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">What Past Participants Say</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {workshop.testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="p-4">
                    <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Section 9: Related Courses */}
          {relatedCourses.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Recommended Courses</h2>
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
          <section className="rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 p-8 text-center border border-amber-200">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Register?</h2>
            <p className="mb-6 text-muted-foreground max-w-lg mx-auto">
              Secure your seat now. Limited spots available, especially for early bird pricing.
            </p>
            <Button
              onClick={handleRegisterClick}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-base"
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
        description="Please login to your account to register for this workshop."
      />

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        type="workshop"
        title={workshop.title}
        company={workshop.organizer}
        location={workshop.location}
        applyLink={workshop.registrationLink}
        applyEmail={workshop.contactEmail}
      />
    </div>
  );
}
