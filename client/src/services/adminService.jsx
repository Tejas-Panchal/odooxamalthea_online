import api from './api';

export const getAllUsers = () => {
  return api.get('/users');
};

export const createUser = (userData) => {
  return api.post('/users', userData);
};

export const createWorkflow = (workflowData) => {
  return api.post('/workflows', workflowData);
};

export const getWorkflows = () => {
  return api.get('/workflows');
};
export const getManagerStats = () => {
  return api.get('/users/manager-expenses');
};

// ... (existing functions)

export const forgotPasswordRequest = (email) => {
  return api.post('/auth/forgot-password', { email });
};
// You would also add services for workflows, company expenses, etc.