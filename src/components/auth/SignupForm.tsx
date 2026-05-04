'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRegister } from '@/lib/hooks/useAuth';
import { registerSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function SignupForm() {
  const router = useRouter();
  const { error: errorToast } = useToast();
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

  const onSubmit = (data: any) => {
    doRegister(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to create account';
        errorToast('Error', message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-1/2 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join CulinaraTech today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input {...register('name')} placeholder="John Doe" />
            {errors.name && <p className="text-xs text-destructive">{(errors.name as any).message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input {...register('email')} type="email" placeholder="you@example.com" />
            {errors.email && <p className="text-xs text-destructive">{(errors.email as any).message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{(errors.password as any).message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">I want to...</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => field.onChange('STUDENT')}
                    className={`p-3 rounded border-2 text-center text-sm font-medium transition ${
                      field.value === 'STUDENT'
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:border-primary'
                    }`}
                  >
                    Learn
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('INSTRUCTOR')}
                    className={`p-3 rounded border-2 text-center text-sm font-medium transition ${
                      field.value === 'INSTRUCTOR'
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:border-primary'
                    }`}
                  >
                    Teach
                  </button>
                </div>
              )}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Creating...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
