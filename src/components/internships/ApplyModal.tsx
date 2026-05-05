'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Loader } from 'lucide-react';

const applySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  college: z.string().min(3, 'Organization required'),
  yearOfStudy: z.string().min(1, 'Year required'),
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Resume is required')
    .refine(
      (files) =>
        files[0]?.type === 'application/pdf' ||
        files[0]?.type === 'application/msword' ||
        files[0]?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Resume must be PDF or Word document'
    )
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, 'Resume must be less than 5MB'),
  coverLetter: z.string().optional(),
});

type ApplyFormData = z.infer<typeof applySchema>;

interface ApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  internshipTitle: string;
  company: string;
  location: string;
  applyLink: string;
}

export function ApplyModal({
  open,
  onOpenChange,
  internshipTitle,
  company,
  location,
  applyLink,
}: ApplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
  });

  const emailValue = watch('email');

  const onSubmit = async (data: ApplyFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedEmail(data.email);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false);
      reset();
      onOpenChange(false);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              Application Submitted!
            </h3>
            <p className="mb-6 text-center text-muted-foreground">
              We'll get back to you at <span className="font-semibold">{submittedEmail}</span> within 5
              business days.
            </p>
            <Button onClick={handleClose} className="bg-secondary hover:bg-secondary/90">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Apply for {internshipTitle}</DialogTitle>
              <DialogDescription>
                <span className="block font-semibold text-foreground">{company}</span>
                <span className="text-sm text-muted-foreground">{location}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name *
                </label>
                <Input
                  {...register('fullName')}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-destructive' : ''}
                />
                {errors.fullName && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address *
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Phone Number *
                </label>
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* College/Organisation */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  College / Current Organisation *
                </label>
                <Input
                  {...register('college')}
                  placeholder="Your institution name"
                  className={errors.college ? 'border-destructive' : ''}
                />
                {errors.college && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.college.message}
                  </span>
                )}
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Year of Study / Experience *
                </label>
                <Input
                  {...register('yearOfStudy')}
                  placeholder="e.g., 3rd Year or 2 Years"
                  className={errors.yearOfStudy ? 'border-destructive' : ''}
                />
                {errors.yearOfStudy && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.yearOfStudy.message}
                  </span>
                )}
              </div>

              {/* Resume */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Upload Resume *
                </label>
                <div className="relative">
                  <input
                    {...register('resume')}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className={`block w-full text-sm text-muted-foreground
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:bg-primary/90
                      ${errors.resume ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.resume && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.resume.message}
                  </span>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, or DOCX (Max 5MB)
                </p>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Cover Letter / Why this internship? (Optional)
                </label>
                <textarea
                  {...register('coverLetter')}
                  placeholder="Tell us why you're interested in this internship..."
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>

              {/* Fallback Link */}
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground text-center">
                  Or{' '}
                  <a
                    href={applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    apply directly on company portal →
                  </a>
                </p>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
