'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, BookOpen, Users } from 'lucide-react';
import { useRegister } from '@/lib/hooks/useAuth';
import { registerSchema, type RegisterFormData, type RoleName } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: doRegister, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'STUDENT' as const,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = (data: RegisterFormData) => {
    doRegister(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to create account';
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-primary p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            CulinaraTech
          </h2>
          <p className="text-lg text-primary-foreground/80">Learn without limits</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md">
          <div className="p-8 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  {...register('name')}
                  placeholder="John Doe"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters
                </p>
              </div>

              {/* Role Selector */}
              <div className="space-y-3 pt-4">
                <label className="text-sm font-medium text-foreground">
                  I want to...
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-4">
                      {/* Learn Card */}
                      <button
                        type="button"
                        onClick={() => field.onChange('STUDENT')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          field.value === 'STUDENT'
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <BookOpen className="h-6 w-6 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            Learn
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            Enroll in courses
                          </span>
                        </div>
                      </button>

                      {/* Teach Card */}
                      <button
                        type="button"
                        onClick={() => field.onChange('INSTRUCTOR')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          field.value === 'INSTRUCTOR'
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-6 w-6 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            Teach
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            Create & sell courses
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary/90 mt-6"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            {/* Footer Link */}
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
