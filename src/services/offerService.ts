import { apiClient } from './apiClient';

export interface Offer {
  _id: string;
  name: string;
  description: string;
  image: string;
  offerType: string;
  couponCode: string;
  discountType: string;
  discountValue: number;
  minimumOrderValue: number;
  buyQuantity: number;
  getQuantity: number;
  applicableCategory: string | null;
  applicableProduct: string | null;
  freeCategory: string | null;
  freeProduct: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit: number | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface OffersResponse {
  success: boolean;
  message: string;
  data: Offer[];
  counts: {
    totalOffers: number;
    activeOffers: number;
    expiredInactive: number;
    totalCouponsUsed: number;
  };
  pagination: {
    currentPage: number;
    limit: number;
    totalOffers: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const offerService = {
  getOffers: async (page = 1, limit = 10, filters: any = {}): Promise<OffersResponse> => {
    let url = `/offers/getOffers?page=${page}&limit=${limit}`;
    if (filters.search) url += `&search=${filters.search}`;
    if (filters.offerType && filters.offerType !== 'All Types') {
      const typeMap: any = {
        'Buy X Get Y': 'buy_get',
        'Discount': 'discount',
        'Flat': 'flat',
        'Percentage': 'percentage'
      };
      url += `&offerType=${typeMap[filters.offerType] || filters.offerType}`;
    }
    if (filters.status && filters.status !== 'All Status') url += `&status=${filters.status.toLowerCase()}`;
    if (filters.startDate) url += `&startDate=${filters.startDate}`;
    if (filters.endDate) url += `&endDate=${filters.endDate}`;

    const response = await apiClient.get(url);
    return response.data;
  },
  createOffer: async (data: any): Promise<any> => {
    const response = await apiClient.post('/offers/createOffer', data);
    return response.data;
  },
  updateOffer: async (id: string, data: any): Promise<any> => {
    const response = await apiClient.put(`/offers/updateOffer/${id}`, data);
    return response.data;
  },
};
