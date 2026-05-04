'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../stores/auth.store';
import type { LoginPayload, RegisterPayload } from '../types';

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response.data.data;
      useAuthStore.getState().setAuth(user, accessToken, refreshToken);

      // Set token in cookie for middleware access
      document.cookie = `accessToken=${accessToken}; path=/; max-age=86400`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800`;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response.data.data;
      useAuthStore.getState().setAuth(user, accessToken, refreshToken);

      // Set token in cookie for middleware access
      document.cookie = `accessToken=${accessToken}; path=/; max-age=86400`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800`;
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      useAuthStore.getState().logout();
    },
  });
}

export function useMe() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    enabled: isAuthenticated,
  });
}
