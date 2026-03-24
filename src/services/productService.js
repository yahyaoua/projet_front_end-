import api from './api';

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category && filters.category !== 'Tous') {
    params.append('category', filters.category);
  }
  if (filters.featured) params.append('featured', true);
  if (filters.search && filters.search !== '') {
    params.append('search', filters.search);
  }

  const response = await api.get(`/api/products?${params}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/api/products?featured=true');
  return response.data;
};