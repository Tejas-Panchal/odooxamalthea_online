import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

// It receives the 'onSubmit' function, 'isLoading' state, and 'defaultCurrency' from the parent
const ExpenseForm = ({ onSubmit, isLoading, defaultCurrency }) => {
  const [expense, setExpense] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    category: '',
    originalAmount: '',
    originalCurrency: defaultCurrency || 'USD',
  });

  // This updates the form's currency if the prop changes
  useEffect(() => {
    setExpense(prev => ({ ...prev, originalCurrency: defaultCurrency || 'USD' }));
  }, [defaultCurrency]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense); // This calls handleExpenseSubmit in the EmployeeDashboard
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Date of Expense" type="date" name="date" value={expense.date} onChange={handleChange} required />
      <Input label="Description" name="description" value={expense.description} onChange={handleChange} required placeholder="e.g., Lunch with Client" />
      <Input label="Category" name="category" value={expense.category} onChange={handleChange} required placeholder="e.g., Meals" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount" type="number" name="originalAmount" value={expense.originalAmount} onChange={handleChange} required placeholder="e.g., 55.00" />
        <Input label="Currency" name="originalCurrency" value={expense.originalCurrency} onChange={handleChange} required />
      </div>
      <div className="pt-4">
        <Button type="submit" variant="primary" disabled={isLoading} className="w-full">
          {isLoading ? 'Submitting...' : 'Submit Expense'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;