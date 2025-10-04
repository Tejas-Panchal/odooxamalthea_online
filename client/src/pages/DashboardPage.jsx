import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';
import ManagerDashboard from '../components/dashboards/ManagerDashboard'; 
import AdminDashboard from '../components/dashboards/AdminDashboard';   
import Layout from '../components/layout/Layout';
const DashboardPage = () => {
  // Logic to determine user role will go here later
  const { user, logout } = useContext(AuthContext);
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