import React from 'react';
import { Link } from 'react-router-dom';

// Component imports
import ExpenseApprovalTable from '../expenses/ExpenseApprovalTable';
import Card from '../common/Card';

const ManagerDashboard = () => {
  // Mock data for the Team Overview - in a real app, this would come from an API
  const teamStats = {
    totalPending: '$850.20',
    avgClaim: '$75.00',
    mostCommonCategory: 'Travel',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content: Pending Approvals */}
      <div className="lg:col-span-2">
        <Card title="Pending Approvals">
          <ExpenseApprovalTable />
        </Card>
      </div>

      {/* Sidebar: Team Overview and Actions */}
      <div className="space-y-8">
        <Card title="Team Overview">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Pending Amount</span>
              <span className="font-semibold text-gray-800">{teamStats.totalPending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Claim</span>
              <span className="font-semibold text-gray-800">{teamStats.avgClaim}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Top Category</span>
              <span className="font-semibold text-gray-800">{teamStats.mostCommonCategory}</span>
            </div>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="flex flex-col space-y-3">
            {/* These links would need corresponding routes set up in App.jsx */}
            <Link to="/manager/my-expenses" className="w-full text-center px-4 py-2 font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              View My Own Expenses
            </Link>
            <Link to="/team-report" className="w-full text-center px-4 py-2 font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              View Full Team Report
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;