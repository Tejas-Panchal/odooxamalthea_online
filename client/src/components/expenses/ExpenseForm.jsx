import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ExpenseForm = ({ onSubmit }) => {
  const [expense, setExpense] = useState({
    date: '',
    description: '',
    category: '',
    originalAmount: '',
    originalCurrency: 'USD',
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense);
    // Clear form after submission
    setExpense({ date: '', description: '', category: '', originalAmount: '', originalCurrency: 'USD' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Submit New Expense</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Date" type="date" name="date" value={expense.date} onChange={handleChange} />
        <Input label="Description" name="description" value={expense.description} onChange={handleChange} />
        <Input label="Category" name="category" value={expense.category} onChange={handleChange} />
        <Input label="Amount" type="number" name="originalAmount" value={expense.originalAmount} onChange={handleChange} />
        <Input label="Currency" name="originalCurrency" value={expense.originalCurrency} onChange={handleChange} />
      </div>
      <Button type="submit" variant="primary">Submit Expense</Button>
    </form>
  );
};

export default ExpenseForm;