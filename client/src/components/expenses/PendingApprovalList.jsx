import React from 'react';

const PendingApprovalList = ({ expenses, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Expenses Pending Your Approval</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Submitted By</th>
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.length > 0 ? (
            expenses.map((exp) => (
              <tr key={exp._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{exp.submittedBy.name}</td> {/* Assuming population */}
                <td className="p-3">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="p-3">{exp.description}</td>
                <td className="p-3 text-right">{`${exp.amount} ${exp.company.defaultCurrency}`}</td> {/* Assuming population */}
                <td className="p-3 text-center space-x-2">
                  <button onClick={() => onApprove(exp._id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">Approve</button>
                  <button onClick={() => onReject(exp._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">No expenses are pending your approval.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApprovalList;