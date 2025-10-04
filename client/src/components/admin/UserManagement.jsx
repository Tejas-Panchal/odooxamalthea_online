import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser } from '../../services/adminService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  
  // Add logic here for a form to create a new user via createUser service

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">User Management</h3>
      {/* Add a form here to create new users */}
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id} className="p-2 border rounded-md flex justify-between">
            <span>{user.name} ({user.email})</span>
            <span className="font-semibold">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;