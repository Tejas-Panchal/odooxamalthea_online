import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';
// We would also import ManagerDashboard and AdminDashboard here

const DashboardPage = () => {
  // Logic to determine user role will go here later
  const userRole = 'Employee'; // Mock role

 const renderDashboardByRole = () => {
    if (!user) return <h2>Loading...</h2>;

    switch (user.role) {
      case 'Employee':
        return <EmployeeDashboard />;
      case 'Manager':
        return <ManagerDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return <h2>Invalid user role.</h2>;
    }
  };

  return (
    <Layout>
    
       
        {renderDashboardByRole()}
  
    </Layout>
  );
};

export default DashboardPage;