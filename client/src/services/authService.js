import api from '../utils/api';

export const authService = {
  async register(name, email, password) {
    try {
      const response = await api.post('/users/register', { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/users/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },

  async logout() {
    try {
      await api.get('/users/logout');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error', error);
    }
  },

  async getUserProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data.user;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch profile');
    }
  }
};