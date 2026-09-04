import { apiClient } from './apiClient';

export const dailyWinnerService = {
  getAllWinners: async () => {
    try {
      const response = await apiClient.get('/daily-winner/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all daily winners:', error);
      throw error;
    }
  },

  getTodayWinner: async () => {
    try {
      const response = await apiClient.get('/daily-winner/today');
      return response.data;
    } catch (error) {
      console.error('Error fetching today daily winner:', error);
      throw error;
    }
  },
};
