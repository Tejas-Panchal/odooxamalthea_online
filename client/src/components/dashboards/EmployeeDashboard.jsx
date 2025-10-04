import React from 'react';
import ExpenseForm from '../expenses/ExpenseForm';
import ExpenseList from '../expenses/ExpenseList';
import { submitExpense, getMyExpenses } from '../../services/expenseService';
import { useState, useEffect } from 'react';


// This component will manage fetching and submitting expenses.
// For now, it just lays out the UI.
const EmployeeDashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await getMyExpenses();
        setExpenses(res.data);
      } catch (err) {
        console.error('Failed to fetch expenses');
      }
    };
    fetchExpenses();
  }, []);

  const handleExpenseSubmit = async (expenseData) => {
    try {
      const res = await submitExpense(expenseData);
      setExpenses([res.data, ...expenses]); // Add new expense to the top of the list
    } catch (err) {
      console.error('Failed to submit expense');
    }
  };

  return (
    <div className="space-y-8">
      <ExpenseForm onSubmit={handleExpenseSubmit} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default EmployeeDashboard;