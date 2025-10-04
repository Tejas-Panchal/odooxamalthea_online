// components/expenses/RecentExpenses.jsx
import React from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} ;

const RecentExpenses = ({ expenses, showEmployee = false, currentUser }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4 flex-1">
            {getStatusIcon(expense.status)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {expense.description}
                </p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(expense.status)}`}>
                  {expense.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>{expense.category}</span>
                <span>•</span>
                <span>{formatDate(expense.date)}</span>
                {showEmployee && expense.employeeName && (
                  <>
                    <span>•</span>
                    <span className="font-medium">
                      {expense.employeeId === currentUser.id ? 'You' : expense.employeeName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              {expense.currency} {expense.amount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              {expense.expenseType}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentExpenses;