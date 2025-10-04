// client/src/components/dashboards/AdminDashboard.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState, useEffect } from 'react';
import { getAllUsers, getCompanyExpenses, getCompanyStats } from '../../services/adminService'; // New service to fetch stats

// Import your own icon components
import UsersIcon from '../icons/UsersIcon';
import CircleStackIcon from '../icons/CircleStackIcon';
import CurrencyDollarIcon from '../icons/CurrencyDollarIcon';
import AllExpensesView from '../../components/admin/AllExpensesView';

// Import other components
import KpiCard from '../common/KpiCard';
import Card from '../common/Card';
import Button from '../common/Button';
import UserListSummary from '../admin/UserListSummary'; // Import summary component
import WorkflowListSummary from '../admin/WorkflowListSummary'; // Import summary component








const AdminDashboard = () => {
  const navigate = useNavigate();
  const [companyStats, setCompanyStats] = useState({
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setCompanyStats({
          totalUsers: data.data.length,
          pendingAmount: 0, // Replace with actual pending amount
          totalall: 0, // Replace with actual total spend this month
        });
      } catch (err) {
        console.error('Failed to fetch company stats:', err);
        setError('Failed to load company statistics');
      } finally {
        setLoading(false);
      }
    };
    const fetchpandingAmount = async () => {
      try {
        setLoading(true);
        const data = await getCompanyExpenses({ status: 'Pending' });
        const totalPending = data.data.reduce((sum, expense) => sum + expense.amount, 0);
        const totalSpendMonth = await getCompanyExpenses();
        const totalall = totalSpendMonth.data.reduce((sum, expense) => sum + expense.amount, 0);
        setCompanyStats(prevStats => ({
          ...prevStats,
          totalSpendMonth: totalall,
        }));

        setCompanyStats(prevStats => ({
          ...prevStats,
          pendingAmount: totalPending,
        }));
      } catch (err) {
        console.error('Failed to fetch pending amount:', err);
        setError('Failed to load pending amount');
      } finally {
        setLoading(false);
      }
    };
    fetchpandingAmount();
    fetchStats();
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

 

  return (
    <div className="space-y-8">
      {/* Company-Wide Overview */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard 
          title="TOTAL USERS" 
          value={loading ? "Loading..." : companyStats.totalUsers} 
          icon={UsersIcon} 
        />
        <KpiCard 
          title="PENDING APPROVAL" 
          value={loading ? "Loading..." : companyStats.pendingAmount} 
          icon={CircleStackIcon} 
        />
        <KpiCard 
          title="TOTAL SPEND (MONTH)" 
          value={loading ? "Loading..." : companyStats.totalSpendMonth} 
          icon={CurrencyDollarIcon} 
        />
      </div>

      {/* Configuration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card 
            title="User Management" 
            actions={
              <Button onClick={() => navigate('/admin/users/create')}>
                + Add New User
              </Button>
            }
          >
            {/* Display the summary list of users */}
            <UserListSummary />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card 
            title="Approval Workflows"
            actions={
              <Button onClick={() => navigate('/admin/workflows/create')}>
                + New Workflow
              </Button>
            }
          >
            {/* Display the summary list of workflows */}
            <WorkflowListSummary />
          </Card>
        </div>
      </div>

      <Card title="All Company Expenses">
        {/* This would be a filterable table component */}
        <AllExpensesView />
      </Card>
    </div>
  );
};

export default AdminDashboard;