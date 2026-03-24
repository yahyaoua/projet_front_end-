import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { 
    email, 
    password 
  });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', { 
    name, 
    email, 
    password 
  });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};