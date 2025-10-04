import api from './api';

export const getAllUsers = () => {
  return api.get('/users');
};

export const createUser = (userData) => {
  return api.post('/users', userData);
};

// You would also add services for workflows, company expenses, etc.