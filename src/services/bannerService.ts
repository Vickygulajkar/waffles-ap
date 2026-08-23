import { apiClient } from './apiClient';

export interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  bannerType: string;
  buttonText: string;
  actionType: string;
  actionId?: string | null;
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BannersResponse {
  success: boolean;
  message: string;
  data: Banner[];
  counts: {
    totalBanners: number;
    activeBanners: number;
    expiredInactive: number;
  };
  pagination: {
    currentPage: number;
    limit: number;
    totalBanners: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const bannerService = {
  getBanners: async (page = 1, limit = 10, filters: any = {}): Promise<BannersResponse> => {
    let url = `/banners/getBanners?page=${page}&limit=${limit}`;
    if (filters.search) url += `&search=${filters.search}`;
    if (filters.bannerType && filters.bannerType !== 'All Types') {
      const typeMap: any = {
        'Carousel': 'carousel',
        'Offer': 'offer'
      };
      url += `&bannerType=${typeMap[filters.bannerType] || filters.bannerType}`;
    }
    if (filters.status && filters.status !== 'All Status') url += `&status=${filters.status.toLowerCase()}`;

    const response = await apiClient.get(url);
    return response.data;
  },

  createBanner: async (data: any): Promise<any> => {
    const response = await apiClient.post('/banners/createBanner', data);
    return response.data;
  },

  updateBanner: async (id: string, data: any): Promise<any> => {
    const response = await apiClient.put(`/updateBanner/${id}`, data);
    return response.data;
  }
};
