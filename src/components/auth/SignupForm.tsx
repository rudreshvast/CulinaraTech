'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building2,
  Loader2,
} from 'lucide-react';
import { useRegister } from '@/lib/hooks/useAuth';
import { type RegisterPayload } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const INTERESTS = [
  'Baking & Pastry',
  'Food Safety',
  'Kitchen Management',
  'Nutrition',
  'Food Technology',
  'Culinary Arts',
  'Hospitality Management',
  'Entrepreneurship',
];

interface SignupFormState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  inCollege: boolean;
  college?: string;
  studentId?: string;
}

export function SignupForm() {
  const router = useRouter();
  const { error: errorToast, success: successToast } = useToast();
  const { mutate: submitSignup, isPending } = useRegister();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<'student' | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register: registerField,
    watch,
    formState: { errors },
  } = useForm<SignupFormState>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      inCollege: false,
      college: '',
      studentId: '',
    },
  });

  const formData = watch();
  const inCollege = watch('inCollege');

  const validateStep = () => {
    if (step === 1 && !selectedRole) {
      errorToast('Error', 'Please select your role');
      return false;
    }
    if (step === 2) {
      if (!formData.name?.trim()) {
        errorToast('Error', 'Name is required');
        return false;
      }
      if (!formData.email?.includes('@')) {
        errorToast('Error', 'Invalid email');
        return false;
      }
      if (!formData.phone || formData.phone.length < 10) {
        errorToast('Error', 'Enter a valid phone number');
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        errorToast('Error', 'Password must be at least 6 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        errorToast('Error', "Passwords don't match");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = () => {
    if (!validateStep()) return;
    const payload: RegisterPayload = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: selectedRole === 'student' ? 'STUDENT' : 'INSTRUCTOR',
    };
    submitSignup(payload, {
      onSuccess: () => {
        successToast('Success!', `Welcome ${formData.name}! Your account has been created.`);
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      },
      onError: (error: any) => {
        const message =
          error.response?.status === 409
            ? 'Email already exists'
            : 'Something went wrong. Please try again.';
        errorToast('Error', message);
      },
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="border-b border-border sticky top-0 z-10 bg-card/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-headline text-lg sm:text-xl font-bold text-primary">
            CulinaraTech
          </Link>
          <ThemeToggle />
        </div>
      </header> */}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-20 sm:pb-12">
        {/* Progress Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="flex justify-between gap-2 sm:gap-4 mt-4">
            {['Role', 'Details', 'Interests'].map((label, i) => {
              const stepNum = i + 1;
              const isDone = stepNum < step;
              const isActive = stepNum === step;

              return (
                <div key={label} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-1 sm:flex-none">
                  <div
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all flex-shrink-0"
                    style={{
                      backgroundColor: isDone
                        ? 'hsl(var(--color-secondary-500))'
                        : isActive
                          ? 'hsl(var(--color-primary-500))'
                          : 'hsl(var(--color-muted))',
                      color: isDone || isActive ? 'hsl(var(--color-muted-foreground))' : 'hsl(var(--color-muted-foreground))',
                    }}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm hidden sm:inline ${
                      isActive
                        ? 'font-semibold text-muted-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">
              Who are you signing up as?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              We'll tailor your experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {/* Student Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`text-left p-4 sm:p-6 rounded-lg border-2 transition-all ${
                  selectedRole === 'student'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-card/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-primary flex-shrink-0" />
                  {selectedRole === 'student' && (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  )}
                </div>
                <h3 className="font-headline text-base sm:text-lg font-bold mt-3 sm:mt-4 text-foreground">
                  I'm a Student
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                  Browse courses, build your skills and get matched to opportunities.
                </p>
              </button>

              {/* College Card */}
              <button
                disabled
                className="text-left p-4 sm:p-6 rounded-lg border-2 border-border opacity-50 cursor-not-allowed"
              >
                <div className="flex items-start justify-between">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs bg-amber/20 text-amber rounded px-2 py-0.5 font-semibold flex-shrink-0">
                    Coming Soon
                  </span>
                </div>
                <h3 className="font-headline text-base sm:text-lg font-bold mt-3 sm:mt-4 text-foreground">
                  I'm from a College
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                  Onboard students, assign courses and track placements.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">
              Your details.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Just the basics.</p>

            <form className="mt-6 sm:mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                    Full Name
                  </label>
                  <Input
                    {...registerField('name', { required: true })}
                    type="text"
                    placeholder="John Doe"
                    className="mt-1.5 bg-muted border-border text-sm"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                    Email
                  </label>
                  <Input
                    {...registerField('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="mt-1.5 bg-muted border-border text-sm"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                    Phone
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs sm:text-sm">
                      +91
                    </span>
                    <Input
                      {...registerField('phone', { required: true })}
                      type="tel"
                      placeholder="9876543210"
                      className="bg-muted border-border pl-12 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                    Password
                  </label>
                  <Input
                    {...registerField('password')}
                    type="password"
                    placeholder="••••••••"
                    className="mt-1.5 bg-muted border-border text-sm"
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                    Confirm Password
                  </label>
                  <Input
                    {...registerField('confirmPassword', { required: true })}
                    type="password"
                    placeholder="••••••••"
                    className="mt-1.5 bg-muted border-border text-sm"
                  />
                </div>
              </div>

              {/* College Checkbox */}
              <label className="flex items-center gap-3 mt-4 sm:mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  {...registerField('inCollege')}
                  className="h-4 w-4 rounded flex-shrink-0"
                />
                <span className="text-xs sm:text-sm font-medium">
                  I'm enrolled in a college
                </span>
              </label>

              {/* College Fields */}
              {inCollege && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4 p-3 sm:p-4 bg-muted rounded-lg">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                      College Name
                    </label>
                    <Input
                      {...registerField('college')}
                      type="text"
                      placeholder="e.g. IHM Mumbai"
                      className="mt-1.5 bg-background border-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                      Student ID
                    </label>
                    <Input
                      {...registerField('studentId')}
                      type="text"
                      placeholder="Your ID"
                      className="mt-1.5 bg-background border-border text-sm"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">
              What interests you?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Pick a few — we'll personalize your feed.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
              {INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-2 sm:gap-4 justify-between mt-8 sm:mt-12">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm py-2 px-3 sm:px-4"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="">Back</span>
          </button>

          {step < 3 ? (
            <button onClick={handleNext} className="btn-primary flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm py-2 px-3 sm:px-4">
              <span className="">Next</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={isPending}
              className="btn-primary flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm py-2 px-3 sm:px-4 justify-center"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  <span className="hidden sm:inline">Creating...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Create Account</span>
                  <span className="sm:hidden">Create</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Sign In Link */}
        <p className="text-xs sm:text-sm text-muted-foreground text-center mt-6 sm:mt-8">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
