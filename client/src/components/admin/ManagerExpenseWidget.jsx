import React, { useState, useEffect } from 'react';
import { getManagerStats } from '../../services/adminService';

const ManagerExpenseWidget = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getManagerStats();
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch manager stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading manager stats...</p>;

  return (
    <div className="space-y-3">
      {stats.map(manager => (
        <div key={manager._id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">{manager.name}</p>
            <p className="text-sm text-gray-500">{manager.teamSize} team members</p>
          </div>
          <p className="text-lg font-bold text-blue-600">${manager.totalTeamExpenses.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ManagerExpenseWidget;