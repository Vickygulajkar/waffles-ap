import { apiClient } from './apiClient';

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: OrderUser;
  items: OrderItem[];
  orderType: string;
  subtotal: number;
  discount: number;
  totalAmount: number;
  currency: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  couponCode: string | null;
  offer: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rewardPoints?: number;
}

export interface OrderCounts {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface OrderPagination {
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface GetAllOrdersResponse {
  success: boolean;
  message: string;
  data: {
    counts: OrderCounts;
    pagination: OrderPagination;
    orders: Order[];
  };
}

export interface GetOrderByIdResponse {
  success: boolean;
  message: string;
  data: Order;
}

export const orderService = {
  getAllOrders: async (page: number = 1, limit: number = 10, status?: string, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status && status !== 'All') params.append('status', status.toLowerCase());
    if (search) params.append('search', search);

    const response = await apiClient.get<GetAllOrdersResponse>(`/orders/getAllOrders?${params.toString()}`);
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await apiClient.get<GetOrderByIdResponse>(`/orders/getOrderById/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/orders/updateOrderStatus/${id}`, { status });
    return response.data;
  },
};
