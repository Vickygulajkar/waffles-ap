import { apiClient } from './apiClient';

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: any;
  isPopular: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isPopular: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  sortOrder: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  status?: string;
  popular?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const productService = {
  createProduct: async (data: CreateProductPayload) => {
    const response = await apiClient.post('/products/create', data);
    return response.data;
  },

  getProducts: async (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.popular) params.append('popular', 'true');
      if (filters.featured) params.append('featured', 'true');
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
    }
    const queryString = params.toString();
    const url = queryString ? `/products/getProducts?${queryString}` : '/products/getProducts';
    const response = await apiClient.get(url);
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get(`/products/getProductById/${id}`);
    return response.data;
  },

  updateProduct: async (id: string, data: Partial<CreateProductPayload>) => {
    const response = await apiClient.put(`/products/updateProduct/${id}`, data);
    return response.data;
  }
};
