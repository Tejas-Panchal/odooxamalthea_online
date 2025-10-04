import React from 'react';

// Correct imports for your own icon components
import UsersIcon from '../icons/UsersIcon';
import CircleStackIcon from '../icons/CircleStackIcon';


// Other component imports
import KpiCard from '../common/KpiCard';
import Card from '../common/Card';
import UserManagement from '../admin/UserManagement';
import ApprovalRuleConfig from '../admin/ApprovalRuleConfig';
import Button from '../common/Button';

const AdminDashboard = () => {
  // Mock data for KPIs - in a real app, this would come from an API
  const companyStats = {
    totalUsers: 25,
    pendingAmount: '$1,230.50',
    totalSpendMonth: '$4,580.00',
  };

  return (
    <div className="space-y-8">
      {/* Company-Wide Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="TOTAL USERS" value={companyStats.totalUsers} icon={UsersIcon} />
        <KpiCard title="PENDING APPROVAL" value={companyStats.pendingAmount} icon={CircleStackIcon} />
        <KpiCard title="TOTAL SPEND (MONTH)" value={companyStats.totalSpendMonth} icon={CurrencyDollarIcon} />
      </div>

      {/* Configuration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card title="User Management" actions={<Button>Add New User</Button>}>
            <UserManagement />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="Approval Workflows">
            <ApprovalRuleConfig />
          </Card>
        </div>
      </div>

      <Card title="All Company Expenses">
        <p className="text-center text-gray-500 p-8">
          A full, filterable table of all company expenses would be displayed here.
        </p>
      </Card>
    </div>
  );
};

export default AdminDashboard;