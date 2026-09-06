import { apiClient } from './apiClient';

export const dailyWinnerService = {

  getEligibleOrders: async () => {
    try {
      const response = await apiClient.get('/daily-winner/eligible-orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching eligible orders:', error);
      throw error;
    }
  },

  makeWinner: async (winnerId: string) => {
    try {
      const response = await apiClient.put(`/daily-winner/make-winner/${winnerId}`);
      return response.data;
    } catch (error) {
      console.error('Error making winner:', error);
      throw error;
    }
  },
};
