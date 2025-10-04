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

<<<<<<< HEAD
export const getCompanyExpenses = (filters = {}) => {
  // `params` will be converted to query string: ?status=Pending&page=1
  return api.get('/expenses/company', { params: filters });
};
// ...existing code...

export const getCompanyStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
=======
// ... (existing functions)

export const forgotPasswordRequest = (email) => {
  return api.post('/auth/forgot-password', { email });
>>>>>>> f10a410f1aef957378d4c7514965b62e3d83ca89
};
// You would also add services for workflows, company expenses, etc.