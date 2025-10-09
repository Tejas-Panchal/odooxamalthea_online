import api from './api';

export const signupUser = (userData) => {
  return api.post('/auth/signup', userData);
};

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

// This will hit the protected /api/auth/me route
export const getLoggedInUser = () => {
  return api.get('/auth/me');
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to send reset email');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', { 
      token, 
      password: newPassword 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to reset password');
  }
};