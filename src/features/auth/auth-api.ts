import apiClient from '../../lib/api-client';

export const login = (email: string, password: string) => {
  return apiClient.post('/api/login', { email, password });
};

export const register = (fields: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  return apiClient.post('/api/register', fields);
};
