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