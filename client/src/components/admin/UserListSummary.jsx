import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../services/adminService';

const UserListSummary = () => {
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await getAllUsers();
        // Get the last 5 users added
        setRecentUsers(res.data.slice(-5).reverse());
      } catch (err) {
        console.error("Failed to fetch users for summary.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentUsers();
  }, []);

  if (loading) return <div className="text-center p-4">Loading users...</div>;

  return (
    <div className="space-y-3">
      {recentUsers.length > 0 ? (
        recentUsers.map(user => (
          <div key={user._id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {user.role}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default UserListSummary;