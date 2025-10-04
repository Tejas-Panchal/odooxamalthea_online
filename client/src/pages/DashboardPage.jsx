import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';
import Layout from '../components/layout/Layout';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import ManagerDashboard from '../components/dashboards/ManagerDashboard';

// We would also import ManagerDashboard and AdminDashboard here

const DashboardPage = () => {
    const { user } = useContext(AuthContext);


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