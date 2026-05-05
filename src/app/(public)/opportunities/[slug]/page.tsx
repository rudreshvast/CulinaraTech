'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  Building2,
  Users,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs } from '@/lib/data/jobs';
import ApplyModal from "@/components/shared/ApplyModal";
import { LoginRequiredModal } from "@/components/auth/LoginRequiredModal";
import { useAuthStore } from "@/lib/stores/auth.store";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function JobDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const job = jobs.find((j) => j.slug === slug);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/opportunities" className="mb-8 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Job not found</h1>
            <p className="mb-6 text-muted-foreground">The job posting you're looking for doesn't exist.</p>
            <Link href="/opportunities">
              <Button>View all jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Senior Role': 'bg-purple-500 text-white',
      'Actively Hiring': 'bg-green-500 text-white',
      'Leadership Role': 'bg-blue-500 text-white',
      'Hybrid': 'bg-indigo-500 text-white',
      'Niche Role': 'bg-orange-500 text-white',
      'Multiple Openings': 'bg-teal-500 text-white',
    };
    return colors[badge] || 'bg-muted text-muted-foreground';
  };

  const isClosingSoon = (dateStr: string): boolean => {
    const now = new Date();
    const lastDate = new Date(dateStr);
    const daysLeft = (lastDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setShowApplyForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <Link href="/opportunities" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>

          <div className="flex gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border">
              <Image
                src={job.companyLogo}
                alt={job.company}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {job.title}
                  </h1>
                  <p className="mt-1 text-lg text-muted-foreground">{job.company}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.featured && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-900">
                      Featured
                    </Badge>
                  )}
                  <Badge className={getBadgeColor(job.badge)}>
                    {job.badge}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {job.employmentType}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {job.experience}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <IndianRupee className="h-4 w-4" />
                  {job.salary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">About This Role</h2>
              <p className="text-muted-foreground leading-relaxed">{job.overview}</p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-foreground">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-foreground">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Preferred Qualifications */}
            {job.preferredQualifications.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Preferred Qualifications</h2>
                <ul className="space-y-3">
                  {job.preferredQualifications.map((qual, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Perks & Benefits */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-foreground">Perks & Benefits</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {job.perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <span className="text-sm text-muted-foreground">{perk}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* About Company */}
            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">About the Company</h2>
              <p className="text-muted-foreground leading-relaxed">{job.aboutCompany}</p>
              {job.companySize && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Company Size</p>
                    <p className="text-foreground">{job.companySize}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Founded</p>
                    <p className="text-foreground">{job.founded}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Headquarters</p>
                    <p className="text-foreground">{job.headquarters}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Type</p>
                    <p className="text-foreground">{job.companyType}</p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="lg:col-span-1">
            {/* Job Summary Card */}
            <div className="sticky top-24 space-y-6 rounded-lg border border-border bg-card p-6">
              {/* Key Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Department</p>
                  <p className="text-foreground">{job.department}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Reporting To</p>
                  <p className="text-foreground">{job.reportingTo}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Team Size</p>
                  <p className="text-foreground">{job.teamSize}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Travel Required</p>
                  <p className="text-foreground">{job.travelRequired}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Work Schedule</p>
                  <p className="text-foreground text-sm">{job.workSchedule}</p>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Application Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Openings</p>
                  <p className="text-lg font-bold text-foreground">{job.openings}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Expected Joining</p>
                  <p className="text-foreground">{job.expectedJoining}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Application Deadline</p>
                  <p className={`font-medium ${isClosingSoon(job.lastDate) ? 'text-destructive' : 'text-foreground'}`}>
                    {formatDate(job.lastDate)}
                    {isClosingSoon(job.lastDate) && ' ⚠️'}
                  </p>
                </div>

                {job.referralBonus && (
                  <div className="rounded-lg bg-amber-50 p-3">
                    <p className="text-xs font-semibold uppercase text-amber-900 mb-1">Referral Bonus</p>
                    <p className="text-sm text-amber-900">{job.referralBonus}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-border" />

              {/* Skills */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Application Steps */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Application Process</p>
                <ol className="space-y-2">
                  {job.applicationProcess.map((step, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 font-semibold text-primary">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-border" />

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button className="w-full" onClick={handleApplyClick}>
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                    Apply on Website
                  </a>
                </Button>
              </div>

              {/* Contact */}
              <div className="text-center text-sm">
                <p className="text-muted-foreground mb-2">Questions?</p>
                <a
                  href={`mailto:${job.applyEmail}`}
                  className="text-primary hover:underline"
                >
                  {job.applyEmail}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login Required"
        description="Please login to your account to apply for this job."
      />

      {/* Apply Modal */}
      <ApplyModal
        isOpen={showApplyForm}
        onClose={() => setShowApplyForm(false)}
        type="job"
        title={job.title}
        company={job.company}
        location={job.location}
        applyLink={job.applyLink}
        applyEmail={job.applyEmail}
      />
    </div>
  );
}
