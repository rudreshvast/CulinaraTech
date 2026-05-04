'use client';

import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/lib/stores/auth.store';
import { authApi } from '@/lib/api/auth.api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AuthHydration({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hydrate = async () => {
      const { accessToken, refreshToken } = useAuthStore.getState();

      if (accessToken && refreshToken) {
        try {
          const response = await authApi.me();
          const user = response.data.data;
          useAuthStore.getState().setUser(user);
        } catch {
          useAuthStore.getState().logout();
        }
      }
    };

    hydrate();
  }, []);

  return children;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydration>{children}</AuthHydration>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
