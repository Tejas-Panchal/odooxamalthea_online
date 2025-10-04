import React from 'react';
import ExpenseForm from '../expenses/ExpenseForm';
import ExpenseList from '../expenses/ExpenseList';

// This component will manage fetching and submitting expenses.
// For now, it just lays out the UI.
const EmployeeDashboard = () => {
  const mockExpenses = [
    { _id: 1, date: '2023-10-27', description: 'Client Lunch', category: 'Meals', originalAmount: 55.00, originalCurrency: 'USD', status: 'Pending' },
    { _id: 2, date: '2023-10-25', description: 'Taxi to Airport', category: 'Travel', originalAmount: 30.00, originalCurrency: 'USD', status: 'Approved' },
  ];

  const handleExpenseSubmit = (expenseData) => {
    console.log('Submitting expense:', expenseData);
    // API call to submit expense will go here
  };

  return (
    <div className="space-y-8">
      <ExpenseForm onSubmit={handleExpenseSubmit} />
      <ExpenseList expenses={mockExpenses} />
    </div>
  );
};

export default EmployeeDashboard;