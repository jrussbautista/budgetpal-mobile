import apiClient from '@/lib/api-client';

export const getDashboard = () => {
  return apiClient.get('/api/dashboard');
};
