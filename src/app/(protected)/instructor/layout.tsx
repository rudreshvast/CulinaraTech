'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth.store';

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && !user.roles.includes('INSTRUCTOR')) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  if (!user?.roles.includes('INSTRUCTOR')) {
    return null;
  }

  return <>{children}</>;
}
