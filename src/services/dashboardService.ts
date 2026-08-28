import { apiClient } from './apiClient';

export interface TopLevelStats {
  totalOrders: { value: number; growth: number };
  totalSales: { value: number; growth: number };
  totalCustomers: { value: number; growth: number };
  todaysWinner: any; // Can be detailed if structure is known
}

export interface OrderSummaryData {
  pending: number;
  confirmed: number;
  preparing: number;
  ready: number;
  delivered: number;
  cancelled: number;
  totalOrders: number;
}

export interface ChartDataPoint {
  name: string;
  sales: number;
}

export interface SalesOverviewData {
  chartData: ChartDataPoint[];
  thisWeekSales: number;
  thisWeekOrders: number;
}

export interface PopularProductData {
  orders: number;
  name: string;
}

export interface RecentOrderData {
  id: string;
  customer: string;
  items: string;
  amount: number;
  payment: string;
  status: string;
  time: string;
}

export interface DashboardStats {
  topLevelStats: TopLevelStats;
  orderSummary: OrderSummaryData;
  salesOverview: SalesOverviewData;
  popularProducts: PopularProductData[];
  recentOrders: RecentOrderData[];
}

export interface GetDashboardStatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}

export const dashboardService = {
  getDashboardStats: async () => {
    const response = await apiClient.get<GetDashboardStatsResponse>('/dashboard/getDashboardStats');
    return response.data;
  }
};
