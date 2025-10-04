import React from 'react';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';
// We would also import ManagerDashboard and AdminDashboard here

const DashboardPage = () => {
  // Logic to determine user role will go here later
  const userRole = 'Employee'; // Mock role

  const renderDashboardByRole = () => {
    switch (userRole) {
      case 'Employee':
        return <EmployeeDashboard />;
      case 'Manager':
        // return <ManagerDashboard />;
        return <h2>Manager Dashboard</h2>;
      case 'Admin':
        // return <AdminDashboard />;
        return <h2>Admin Dashboard</h2>;
      default:
        return <h2>Welcome!</h2>;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {renderDashboardByRole()}
    </div>
  );
};

export default DashboardPage;