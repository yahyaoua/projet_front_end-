import api from './api';

const BASE_URL = 'http://localhost:8000';

const formatImage = (image) => {
  if (!image) return null
  if (image.startsWith('http')) return image
  if (image.startsWith('/images')) return image
  if (image.startsWith('/src')) return image
  return `${BASE_URL}/${image}`
}

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
  return response.data.map((p) => ({
    ...p,
    image: formatImage(p.image)
  }));
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  const p = response.data;
  return {
    ...p,
    image: formatImage(p.image)
  };
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/api/products?featured=true');
  return response.data.map((p) => ({
    ...p,
    image: formatImage(p.image)
  }));
};