'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import type { LoginPayload, RegisterPayload, User } from '../types';
import {
  createUser as createLocalUser,
  authenticateUser,
  findUserById,
  initializeDefaultUsers,
} from '../utils/localStorage';

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      initializeDefaultUsers();
      const result = authenticateUser(payload.email, payload.password);

      if ('error' in result) {
        if (result.error === 'USER_NOT_FOUND') {
          throw new Error('User not found');
        } else if (result.error === 'INVALID_PASSWORD') {
          throw new Error('Password is wrong');
        }
        throw new Error('Authentication failed');
      }

      return result;
    },
    onSuccess: (result) => {
      if ('error' in result) return;

      const user: User = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        avatarUrl: null,
        isVerified: true,
        roles: [result.user.role],
        createdAt: result.user.createdAt,
      };

      useAuthStore.getState().setAuth(user, result.token, result.token);

      // Set token in cookie for middleware access
      document.cookie = `accessToken=${result.token}; path=/; max-age=86400`;
      document.cookie = `refreshToken=${result.token}; path=/; max-age=604800`;
    },
    onError: (error: any) => {
      // Error will be caught and handled by the component
      throw error;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      initializeDefaultUsers();

      const role = (payload.role || 'STUDENT') as 'STUDENT' | 'INSTRUCTOR';
      const storedUser = createLocalUser(
        payload.email,
        payload.password,
        payload.name,
        role
      );

      // Generate token
      const token = btoa(
        JSON.stringify({ id: storedUser.id, email: storedUser.email, iat: Date.now() })
      );

      return {
        user: storedUser,
        token,
      };
    },
    onSuccess: (result) => {
      const user: User = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        avatarUrl: null,
        isVerified: true,
        roles: [result.user.role],
        createdAt: result.user.createdAt,
      };

      useAuthStore.getState().setAuth(user, result.token, result.token);

      // Set token in cookie for middleware access
      document.cookie = `accessToken=${result.token}; path=/; max-age=86400`;
      document.cookie = `refreshToken=${result.token}; path=/; max-age=604800`;
    },
    onError: (error: any) => {
      if (error.message === 'Email already registered') {
        throw new Error('Email already registered');
      }
      throw error;
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      // No server call needed
      return null;
    },
    onSuccess: () => {
      useAuthStore.getState().logout();
    },
  });
}

export function useMe() {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return { data: { data: user } };
    },
    enabled: isAuthenticated,
  });
}
