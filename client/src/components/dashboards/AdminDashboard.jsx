import React from 'react';
import UserManagement from '../admin/UserManagement';
// Import other admin components like WorkflowEditor, AllExpensesView etc.

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <UserManagement />
      {/* <WorkflowEditor /> */}
      {/* <AllExpensesView /> */}
    </div>
  );
};

export default AdminDashboard;