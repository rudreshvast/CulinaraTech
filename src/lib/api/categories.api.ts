import apiClient from './client';
import type { Category, ApiResponse } from '../types';

export const categoriesApi = {
  getAll: () =>
    apiClient.get<ApiResponse<Category[]>>('/categories'),
};
