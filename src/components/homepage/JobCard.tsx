'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { ApplyModal } from '@/components/modals/ApplyModal';
import { Job } from '@/lib/data';

interface JobCardProps {
  job: Job;
}

const badgeColorMap: Record<string, { bg: string; text: string }> = {
  Trending: { bg: 'bg-red-100', text: 'text-red-700' },
  Hot: { bg: 'bg-orange-100', text: 'text-orange-700' },
  New: { bg: 'bg-green-100', text: 'text-green-700' },
};

export function JobCard({ job }: JobCardProps) {
  const { isAuthenticated } = useAuthStore();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const today = new Date();
  const lastDate = new Date(job.lastDate);
  const daysLeft = Math.ceil((lastDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isClosing = daysLeft <= 7;

  const badgeColor = job.badge ? badgeColorMap[job.badge] : null;
  const postedDate = new Date();
  postedDate.setDate(postedDate.getDate() - job.postedDaysAgo);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    } else {
      setApplyModalOpen(true);
    }
  };

  return (
    <>
      <Link href={`/opportunities`}>
        <div className="bg-card border border-border rounded-2xl my-2 p-6 hover:shadow-lg hover:border-primary-200 hover:-translate-y-1 transition group">
          <div className="flex gap-6 items-start">
            {/* Logo */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-border">
              <Image src={job.companyLogo} alt={job.company} fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Row 1: Title, Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-500 transition line-clamp-1">
                  {job.title}
                </h3>
                {job.badge && (
                  <span className={`${badgeColor?.bg} ${badgeColor?.text} text-xs font-semibold px-2 py-1 rounded whitespace-nowrap`}>
                    {job.badge}
                  </span>
                )}
              </div>

              {/* Row 2: Company and Type */}
              <div className="flex items-center gap-2 mb-3">
                <p className="font-semibold text-foreground">{job.company}</p>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">{job.companyType}</span>
              </div>

              {/* Row 3: Location, Experience, Employment Type */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.employmentType}</span>
                </div>
              </div>

              {/* Row 4: Salary */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-secondary-600">
                  ₹{(job.salaryMin / 100000).toFixed(1)}–{(job.salaryMax / 100000).toFixed(1)} LPA
                </span>
                {job.salaryNegotiable && <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Negotiable</span>}
              </div>

              {/* Row 5: Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Row 6: Meta Info and CTA */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{job.openings} opening(s)</span>
                  <span>•</span>
                  <span>Posted {job.postedDaysAgo}d ago</span>
                  <span>•</span>
                  <span className={isClosing ? 'text-destructive font-semibold' : ''}>
                    Apply by {lastDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="border border-border hover:border-primary-300 text-primary-500 hover:text-primary-600 text-xs font-semibold px-3 py-1.5 rounded transition">
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleApplyClick();
                    }}
                    className="bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Modals */}
      <LoginRequiredModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        title="Login Required"
        description="Please login to your account to apply for jobs"
      />
      <ApplyModal
        open={applyModalOpen}
        onOpenChange={setApplyModalOpen}
        position={job.title}
        company={job.company}
        title={job.title}
        onSubmit={(data) => {
          console.log('Application submitted:', data);
        }}
      />
    </>
  );
}
