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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Loader, ExternalLink, Mail } from 'lucide-react';

type OpportunityType = 'internship' | 'job' | 'workshop' | 'visit';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: OpportunityType;
  title: string;
  company: string;
  location: string;
  applyLink: string;
  applyEmail?: string;
}

// Validation schemas
const baseSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
});

const applicationSchema = baseSchema.extend({
  college: z.string().min(3, 'Organization required'),
  yearOfStudy: z.string().min(1, 'Year required'),
  resume: z
    .any()
    .refine((files) => files?.length > 0, 'Resume is required')
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

const registrationSchema = baseSchema.extend({
  organisation: z.string().min(3, 'Organisation or College required'),
  designation: z.string().min(1, 'Designation or Year required'),
  dietary: z.enum(['veg', 'non-veg', 'vegan']).optional(),
  requirements: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;
type RegistrationFormData = z.infer<typeof registrationSchema>;
type FormData = ApplicationFormData | RegistrationFormData;

export default function ApplyModal({
  isOpen,
  onClose,
  type,
  title,
  company,
  location,
  applyLink,
  applyEmail,
}: ApplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const isApplicationType = type === 'internship' || type === 'job';
  const schema = isApplicationType ? applicationSchema : registrationSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const emailValue = watch('email');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedEmail(emailValue);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false);
      reset();
    }
    onClose();
  };

  const heading = isApplicationType ? `Apply for ${title}` : `Register for ${title}`;
  const submitLabel = isApplicationType ? 'Submit Application' : 'Confirm Registration';
  const successHeading = isApplicationType ? 'Done! Your application is submitted.' : "You're registered!";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-foreground text-center">
              {successHeading}
            </h3>
            <p className="mb-6 text-center text-muted-foreground">
              We'll send a confirmation to <span className="font-semibold">{submittedEmail}</span>
            </p>
            <Button
              onClick={handleClose}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{heading}</DialogTitle>
              <DialogDescription>
                <span className="block font-semibold text-foreground">{company}</span>
                <span className="text-sm text-muted-foreground">{location}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  placeholder="Enter your full name"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
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
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  {...register('phone')}
                  type="tel"
                  placeholder="10-digit mobile number"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Conditional: College or Organisation */}
              {isApplicationType ? (
                <div>
                  <label
                    htmlFor="college"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    College / Current Organisation *
                  </label>
                  <Input
                    id="college"
                    {...register('college')}
                    placeholder="Your institution name"
                    aria-invalid={(errors as any).college ? 'true' : 'false'}
                    className={(errors as any).college ? 'border-destructive' : ''}
                  />
                  {(errors as any).college && (
                    <span className="text-xs text-destructive mt-1 block">
                      {(errors as any).college.message}
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="organisation"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Organisation or College *
                  </label>
                  <Input
                    id="organisation"
                    {...register('organisation' as any)}
                    placeholder="Your institution name"
                    aria-invalid={(errors as any).organisation ? 'true' : 'false'}
                    className={(errors as any).organisation ? 'border-destructive' : ''}
                  />
                  {(errors as any).organisation && (
                    <span className="text-xs text-destructive mt-1 block">
                      {(errors as any).organisation.message}
                    </span>
                  )}
                </div>
              )}

              {/* Conditional: Year of Study or Designation */}
              {isApplicationType ? (
                <div>
                  <label
                    htmlFor="yearOfStudy"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Year of Study / Experience *
                  </label>
                  <Input
                    id="yearOfStudy"
                    {...register('yearOfStudy')}
                    placeholder="e.g., 3rd Year or 2 Years"
                    aria-invalid={(errors as any).yearOfStudy ? 'true' : 'false'}
                    className={(errors as any).yearOfStudy ? 'border-destructive' : ''}
                  />
                  {(errors as any).yearOfStudy && (
                    <span className="text-xs text-destructive mt-1 block">
                      {(errors as any).yearOfStudy.message}
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Designation or Year of Study *
                  </label>
                  <Input
                    id="designation"
                    {...register('designation' as any)}
                    placeholder="e.g., Manager or 2nd Year"
                    aria-invalid={(errors as any).designation ? 'true' : 'false'}
                    className={(errors as any).designation ? 'border-destructive' : ''}
                  />
                  {(errors as any).designation && (
                    <span className="text-xs text-destructive mt-1 block">
                      {(errors as any).designation.message}
                    </span>
                  )}
                </div>
              )}

              {/* Conditional: Resume Upload (Application only) */}
              {isApplicationType && (
                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Upload Resume *
                  </label>
                  <div className="relative">
                    <input
                      id="resume"
                      {...register('resume')}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className={`block w-full text-sm text-muted-foreground
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-primary-foreground
                        hover:file:bg-primary/90
                        ${(errors as any).resume ? 'border-destructive' : ''}`}
                      aria-invalid={(errors as any).resume ? 'true' : 'false'}
                    />
                  </div>
                  {(errors as any).resume && (
                    <span className="text-xs text-destructive mt-1 block">
                      {(errors as any).resume.message}
                    </span>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, or DOCX (Max 5MB)
                  </p>
                </div>
              )}

              {/* Conditional: Dietary Preference (Registration only) */}
              {!isApplicationType && (
                <div>
                  <label
                    htmlFor="dietary"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Dietary Preference (Optional)
                  </label>
                  <select
                    id="dietary"
                    {...register('dietary' as any)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  >
                    <option value="">Select preference...</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>
              )}

              {/* Conditional: Cover Letter or Special Requirements */}
              {isApplicationType ? (
                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Cover Letter / Why this {type}? (Optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    {...register('coverLetter' as any)}
                    placeholder={`Tell us why you're interested in this ${type}...`}
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Any Special Requirements? (Optional)
                  </label>
                  <textarea
                    id="requirements"
                    {...register('requirements' as any)}
                    placeholder="Let us know if you have any special requirements or accessibility needs..."
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {isApplicationType ? 'Submitting...' : 'Registering...'}
                  </>
                ) : (
                  submitLabel
                )}
              </Button>

              {/* Fallback Links */}
              <div className="border-t border-border pt-4 space-y-2">
                <p className="text-xs text-muted-foreground text-center">
                  Prefer to apply directly?{' '}
                  <a
                    href={applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    Open link
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
                {applyEmail && (
                  <p className="text-xs text-muted-foreground text-center">
                    or{' '}
                    <a
                      href={`mailto:${applyEmail}`}
                      className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      {applyEmail}
                    </a>
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
