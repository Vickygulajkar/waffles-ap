import { apiClient } from './apiClient';

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('files', file);

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = response.data;
    
    // The backend returns: { success: true, data: [ { url: '...' } ] }
    if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
      return result.data[0].url;
    }
    
    // Fallback if structure changes
    return result?.url || 'uploaded-image-url';
  }
};
