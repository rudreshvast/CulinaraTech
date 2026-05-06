'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { ApplyModal } from '@/components/modals/ApplyModal';
import { Internship } from '@/lib/data';

interface InternshipCardProps {
  internship: Internship;
}

const badgeColorMap: Record<string, { bg: string; text: string }> = {
  Urgent: { bg: 'bg-destructive/10', text: 'text-destructive' },
  Hot: { bg: 'bg-secondary/10', text: 'text-secondary-600' },
  New: { bg: 'bg-tertiary/10', text: 'text-tertiary-600' },
  'Closing Soon': { bg: 'bg-secondary/10', text: 'text-secondary-600' },
};

export function InternshipCard({ internship }: InternshipCardProps) {
  const { isAuthenticated } = useAuthStore();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const today = new Date();
  const lastDate = new Date(internship.lastDate);
  const daysLeft = Math.ceil((lastDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isClosing = daysLeft <= 7;

  const badgeColor = internship.badge ? badgeColorMap[internship.badge] : null;

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    } else {
      setApplyModalOpen(true);
    }
  };

  return (
    <>
      <Link href={`/internships`}>
        <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 transition group h-full">
          {/* Top Row: Logo, Badge, Stipend */}
          <div className="flex items-start justify-between mb-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
              <Image src={internship.companyLogo} alt={internship.company} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-2">
              {internship.badge && (
                <span className={`${badgeColor?.bg} ${badgeColor?.text} text-xs font-semibold px-2 py-1 rounded`}>
                  {internship.badge}
                </span>
              )}
              <span className="font-bold text-secondary-600">₹{internship.stipend.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary-500 transition h-18">
            {internship.title}
          </h3>

          {/* Company */}
          <p className="text-sm text-muted-foreground mb-4">{internship.company}</p>

          {/* Details Pills */}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              <MapPin className="w-3 h-3" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              <Clock className="w-3 h-3" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              <Briefcase className="w-3 h-3" />
              <span>{internship.locationType}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {internship.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-1">+{internship.skills.length - 3} more</span>
            )}
          </div>

          {/* Apply By */}
          <div className={` text-xs font-semibold mb-4 ${isClosing ? 'text-destructive' : 'text-muted-foreground'}`}>
            Apply by {lastDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            {isClosing && <span className="text-destructive"> - Closing soon!</span>}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">{internship.openings} opening(s)</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleApplyClick();
              }}
              className="bg-primary hover:bg-primary-600 text-primary-foreground text-white text-xs font-semibold px-3 py-1.5 rounded transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </Link>

      {/* Modals */}
      <LoginRequiredModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        title="Login Required"
        description="Please login to your account to apply for internships"
      />
      <ApplyModal
        open={applyModalOpen}
        onOpenChange={setApplyModalOpen}
        position={internship.title}
        company={internship.company}
        title={internship.title}
        onSubmit={(data) => {
          console.log('Application submitted:', data);
        }}
      />
    </>
  );
}
