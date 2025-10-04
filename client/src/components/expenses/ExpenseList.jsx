import React from 'react';
// Corrected imports
import ClockIcon from '../icons/ClockIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Pending: { icon: ClockIcon, text: 'Pending', classes: 'bg-amber-100 text-amber-800', iconColor: 'text-amber-500' },
    Approved: { icon: CheckCircleIcon, text: 'Approved', classes: 'bg-green-100 text-green-800', iconColor: 'text-green-500' },
    Rejected: { icon: XCircleIcon, text: 'Rejected', classes: 'bg-red-100 text-red-800', iconColor: 'text-red-500' },
  };
  const { icon: Icon, text, classes, iconColor } = statusConfig[status] || statusConfig.Pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      <Icon className={`-ml-0.5 mr-1.5 h-4 w-4 ${iconColor}`} />
      {text}
    </span>
  );
};

const ExpenseList = ({ expenses }) => {
  // ... rest of the component is the same
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Date</th>
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Description</th>
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase text-right">Amount</th>
            <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {expenses && expenses.length > 0 ? (
            expenses.map(exp => (
              <tr key={exp._id} className="hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="p-3 font-medium text-gray-800">{exp.description}</td>
                <td className="p-3 text-sm text-gray-700 text-right">{`${exp.originalAmount.toFixed(2)} ${exp.originalCurrency}`}</td>
                <td className="p-3"><StatusBadge status={exp.status} /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">You haven't submitted any expenses yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;