import React, { useState, useEffect } from 'react';
import { submitExpense, getMyExpenses } from '../../services/expenseService';

// Correct imports for your own icon components
import DocumentPlusIcon from '../icons/DocumentPlusIcon';
import DocumentMagnifyingGlassIcon from '../icons/DocumentMagnifyingGlassIcon';
import ClockIcon from '../icons/ClockIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';

// Other component imports
import KpiCard from '../common/KpiCard';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ExpenseForm from '../expenses/ExpenseForm';
import ExpenseList from '../expenses/ExpenseList';

const EmployeeDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock stats - in a real app, this would come from an API endpoint
  const pendingCount = expenses.filter(e => e.status === 'Pending').length;
  const approvedAmount = expenses
    .filter(e => e.status === 'Approved')
    .reduce((sum, e) => sum + e.originalAmount, 0);

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
      setExpenses([res.data, ...expenses]);
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      console.error('Failed to submit expense');
    }
  };

  // The one and only declaration of actionButtons
  const actionButtons = (
    <>
      <button onClick={() => alert('OCR feature coming soon!')} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
        <DocumentMagnifyingGlassIcon className="h-5 w-5" />
        <span>Scan Receipt</span>
      </button>
      <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
        <DocumentPlusIcon className="h-5 w-5" />
        <span>Enter Manually</span>
      </button>
    </>
  );

  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KpiCard title="PENDING" value={`${pendingCount} Expenses`} icon={ClockIcon} />
        <KpiCard title="APPROVED (ALL TIME)" value={`$${approvedAmount.toFixed(2)}`} icon={CheckCircleIcon} />
      </div>

      {/* Expense History Card */}
      <Card title="My Expense History" actions={actionButtons}>
        <ExpenseList expenses={expenses} />
      </Card>

      {/* Modal for Expense Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit New Expense">
        <ExpenseForm onSubmit={handleExpenseSubmit} />
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;