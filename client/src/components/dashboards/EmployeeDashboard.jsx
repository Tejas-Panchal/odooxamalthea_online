import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { submitExpense, getMyExpenses } from '../../services/expenseService';

// Import your components
import KpiCard from '../common/KpiCard';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ExpenseForm from '../expenses/ExpenseForm';
import ExpenseList from '../expenses/ExpenseList';

// Import your local icons
import { DocumentPlusIcon, ClockIcon, CheckCircleIcon } from '../icons/index.js';

const EmployeeDashboard = () => {
  // Get user data from the global context to find the default currency
  const { user } = useContext(AuthContext);

  // --- STATE MANAGEMENT ---
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // This controls the pop-up
  const [isLoading, setIsLoading] = useState(false); // For showing a loading state on the submit button
  const [error, setError] = useState('');

  // Determine the company's default currency from the logged-in user's data
  const companyCurrency = user?.company?.defaultCurrency || 'USD';

  // --- DATA FETCHING ---
  const fetchExpenses = async () => {
    try {
      const res = await getMyExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses');
      setError('Could not load your expenses.');
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component first loads
  }, []);

  // --- THE CORE LOGIC FOR SUBMITTING THE FORM ---
  const handleExpenseSubmit = async (expenseData) => {
    setIsLoading(true);
    setError('');
    try {
      // 1. Call the API service to save the data to the database
      const res = await submitExpense(expenseData);
      
      // 2. On success, update the list of expenses on the screen instantly
      // The backend sends back the newly created expense, which we add to the top of our list
      setExpenses([res.data, ...expenses]);
      
      // 3. Close the pop-up modal
      setIsModalOpen(false);

    } catch (err) {
      console.error('Failed to submit expense:', err);
      setError('Submission failed. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX for the action buttons ---
  const actionButtons = (
    <>
      {/* This button now opens the pop-up by setting isModalOpen to true */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <DocumentPlusIcon className="h-5 w-5" />
        <span>Add Expense Manually</span>
      </button>
    </>
  );

  // --- KPI Calculations (for display) ---
  const pendingCount = expenses.filter(e => e.status === 'Pending').length;
  const approvedAmount = expenses
    .filter(e => e.status === 'Approved')
    .reduce((sum, e) => sum + e.originalAmount, 0);

  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KpiCard title="PENDING" value={`${pendingCount} Expenses`} icon={ClockIcon} />
        <KpiCard title="APPROVED (ALL TIME)" value={`$${approvedAmount.toFixed(2)}`} icon={CheckCircleIcon} />
      </div>

      {/* Expense History Card */}
      <Card title="My Submitted Expenses" actions={actionButtons}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <ExpenseList expenses={expenses} />
      </Card>

      {/* --- THE POP-UP MODAL --- */}
      {/* It is controlled by the 'isModalOpen' state */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Expense Details">
        <ExpenseForm
          onSubmit={handleExpenseSubmit}
          isLoading={isLoading}
          defaultCurrency={companyCurrency}
        />
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;