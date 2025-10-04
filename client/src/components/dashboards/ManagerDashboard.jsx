import React, { useState, useEffect } from 'react';
import { getPendingExpenses, approveExpense, rejectExpense } from '../../services/expenseService';
import PendingApprovalList from '../expenses/PendingApprovalList';

const ManagerDashboard = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await getPendingExpenses();
      setPendingExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch pending expenses');
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (expenseId) => {
    const comment = prompt("Optional: Add a comment for approval");
    try {
      await approveExpense(expenseId, comment);
      // Refresh the list after action
      fetchPending();
    } catch (err) {
      console.error("Failed to approve expense");
    }
  };

  const handleReject = async (expenseId) => {
    const comment = prompt("Please provide a reason for rejection");
    if (comment) { // Require a comment for rejection
      try {
        await rejectExpense(expenseId, comment);
        // Refresh the list after action
        fetchPending();
      } catch (err) {
        console.error("Failed to reject expense");
      }
    }
  };

  return (
    <div>
      <PendingApprovalList
        expenses={pendingExpenses}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default ManagerDashboard;