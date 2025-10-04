import React, { useState, useEffect } from 'react';
import { getCompanyExpenses, getAllUsers } from '../../services/adminService';

const AllExpensesView = () => {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]); // For the employee filter dropdown
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    employee: '',
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  // Fetch both expenses and the list of users for the filter dropdown
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [expensesRes, usersRes] = await Promise.all([
        getCompanyExpenses(filters),
        getAllUsers()
      ]);
      setExpenses(expensesRes?.data || []); 
      setPagination(expensesRes?.data?.pagination || {});
      setUsers(usersRes?.data || []);
      console.log(expensesRes, usersRes);
      } catch (error) {
        console.error("Failed to fetch company expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]); // Re-fetch data whenever the filters change

  const handleFilterChange = (e) => {
    // Reset to page 1 whenever a filter is changed
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };
  
  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Approved' ? 'bg-green-100 text-green-800' :
      status === 'Rejected' ? 'bg-red-100 text-red-800' :
      'bg-yellow-100 text-yellow-800'
    }`}>{status}</span>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">All Company Expenses</h3>

      {/* Filter Controls */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md">
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
          <select id="employee" name="employee" value={filters.employee} onChange={handleFilterChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md">
            <option value="">All</option>
            {Array.isArray(users) && users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="text-center p-8">Loading...</td></tr>
            ) : (
              expenses.map(expense => (
                <tr key={expense._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{expense.submittedBy?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 max-w-sm truncate">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><StatusBadge status={expense.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalExpenses} total)
        </span>
      </div>
    </div>
  );
};

export default AllExpensesView;