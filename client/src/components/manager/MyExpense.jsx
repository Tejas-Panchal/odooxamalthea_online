import React, { useState, useEffect } from 'react';
import { getMyExpenses } from '../../services/expenseService';
import Modal from '../common/Modal';
import ExpenseForm from '../expenses/ExpenseForm';

const MyExpense = () => {
    const [myExpenses, setMyExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchMyExpenses = async () => {
            try {
                setLoading(true);
                const res = await getMyExpenses();
                setMyExpenses(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Failed to fetch my expenses:", err);
                setError("Failed to load expenses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyExpenses();
    }, []);

    const handleExpenseSubmit = async (expenseData) => {
        try {
            // After successful submission, refresh the expenses list
            const res = await getMyExpenses();
            setMyExpenses(res.data);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to refresh expenses:", err);
            setError("Failed to update expenses list.");
        }
    };

    const StatusBadge = ({ status }) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'Approved' ? 'bg-green-100 text-green-800' :
            status === 'Rejected' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
        }`}>
            {status}
        </span>
    );

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600 p-4">{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">My Expenses</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New Expense
                </button>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => {window.location.href = '/dashboard';}}
                >back to dashboard</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Expense"
            >
                <ExpenseForm
                    onSubmit={handleExpenseSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {myExpenses.map((expense) => (
                            <tr key={expense._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{expense.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{expense.category}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="text-sm text-gray-900">${expense.amount.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <StatusBadge status={expense.status} />
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <button 
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        onClick={() => {/* View details logic */}}
                                    >
                                        View
                                    </button>
                                    {expense.status === 'Pending' && (
                                        <button 
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => {/* Delete logic */}}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {myExpenses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No expenses found. Create one by clicking the "Add New Expense" button.
                </div>
            )}
        </div>
    );
};

export default MyExpense;