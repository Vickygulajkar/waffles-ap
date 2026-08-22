import { apiClient } from './apiClient';

export interface CreateCategoryPayload {
  name: string;
  image: string;
  icon: string;
  type: string;
  sortOrder: number;
}

export interface Category {
  _id: string;
  name: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  image: string;
}

export const categoryService = {
  createCategory: async (data: CreateCategoryPayload) => {
    const response = await apiClient.post('/categories/createCategory', data);
    return response.data;
  },

  getCategories: async (type?: string) => {
    const url = type && type !== 'all' ? `/categories/getAllCategories?type=${type}` : '/categories/getAllCategories';
    const response = await apiClient.get(url);
    return response.data;
  }
};
