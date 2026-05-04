import apiClient from './client';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
  ApiResponse,
} from '../types';

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', payload),

  refresh: (refreshToken: string) =>
    apiClient.post<{ data: { accessToken: string } }>('/auth/refresh', {
      refreshToken,
    }),

  logout: () => apiClient.post('/auth/logout'),

  me: () => apiClient.get<ApiResponse<User>>('/auth/me'),
};
