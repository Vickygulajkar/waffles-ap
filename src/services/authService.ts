import { apiClient } from "./apiClient";

export interface LoginPayload {
  email?: string;
  password?: string;
}

export const loginAdmin = async (payload: LoginPayload) => {
  const response = await apiClient.post('/admin/login', payload);
  return response.data;
};

export interface User {
  _id: string;
  mobile: string;
  name: string;
  email: string;
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getAllUsers = async (filters?: any) => {
  const params = new URLSearchParams();
  if (filters) {
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
  }
  const queryString = params.toString();
  const url = queryString ? `/auth/getAllUsers?${queryString}` : '/auth/getAllUsers';
  const response = await apiClient.get(url);
  return response.data;
};
