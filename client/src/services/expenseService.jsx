import api from './api';

export const submitExpense = (expenseData) => {
  // The token is automatically added by the axios interceptor
  return api.post('/expenses', expenseData);
};

export const getMyExpenses = () => {
  return api.get('/expenses/my-expenses');
};

export const getPendingExpenses = () => {
  // Hits the GET /api/expenses/pending-approval route
  return api.get('/expenses/pending-approval');
};

export const approveExpense = (expenseId, comment) => {
  // Hits the PUT /api/expenses/:id/approve route
  return api.put(`/expenses/${expenseId}/approve`, { comment });
};

export const rejectExpense = (expenseId, comment) => {
  // Hits the PUT /api/expenses/:id/reject route
  return api.put(`/expenses/${expenseId}/reject`, { comment });
};

