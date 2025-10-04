import React, { useState, useEffect } from 'react';

// Mock service
const mockExpenseService = {
  getPendingExpenses: async () => Promise.resolve({ data: [
    { _id: '1', submittedBy: { name: 'John Doe' }, date: new Date(), description: 'Client Dinner', amount: 150.00, company: { defaultCurrency: 'USD' } }
  ] }),
};

const ExpenseApprovalTable = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true);
      const res = await mockExpenseService.getPendingExpenses();
      setPendingExpenses(res.data);
      setLoading(false);
    };
    fetchPending();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Submitted By</th>
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Description</th>
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase text-right">Amount</th>
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pendingExpenses.length > 0 ? (
            pendingExpenses.map(exp => (
              <tr key={exp._id}>
                <td className="p-3">{exp.submittedBy.name}</td>
                <td className="p-3 font-medium">{exp.description}</td>
                <td className="p-3 text-right">{`${exp.amount.toFixed(2)} ${exp.company.defaultCurrency}`}</td>
                <td className="p-3 text-center space-x-2">
                   <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-semibold">Approve</button>
                   <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-semibold">Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" className="text-center p-4">No expenses pending approval.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseApprovalTable;