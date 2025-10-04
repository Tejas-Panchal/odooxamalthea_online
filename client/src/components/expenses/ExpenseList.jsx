import React from 'react';

// A single row in the list
const ExpenseItem = ({ expense }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
    <td className="p-3">{expense.description}</td>
    <td className="p-3">{expense.category}</td>
    <td className="p-3 text-right">{`${expense.originalAmount} ${expense.originalCurrency}`}</td>
    <td className="p-3">
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        expense.status === 'Approved' ? 'bg-green-200 text-green-800' :
        expense.status === 'Rejected' ? 'bg-red-200 text-red-800' :
        'bg-yellow-200 text-yellow-800'
      }`}>
        {expense.status}
      </span>
    </td>
  </tr>
);

// The full list component
const ExpenseList = ({ expenses }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">My Expenses</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Category</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.length > 0 ? (
            expenses.map(exp => <ExpenseItem key={exp._id} expense={exp} />)
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;