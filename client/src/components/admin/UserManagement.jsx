import React, { useState, useEffect } from 'react';
import { createUser, getAllUsers } from '../../services/adminService';
import Input from '../common/Input'; // Reusing our common Input component
import Button from '../common/Button'; // Reusing our common Button component

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
    manager: '',
  });

  // Function to fetch all users and update the state
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      // Filter for managers to populate the dropdown
      setManagers(res.data.filter(user => user.role === 'Manager'));
    } catch (err) {
      setError('Failed to fetch users.');
      console.error(err);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await createUser(formData);
      alert('User created successfully!');
      // Reset form and refresh user list
      setFormData({ name: '', email: '', password: '', role: 'Employee', manager: '' });
      fetchUsers();
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Failed to create user.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">User Management</h3>

      {/* Create User Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h4 className="text-lg font-medium text-gray-700">Create New User</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div>
            <label htmlFor="manager" className="block text-gray-700 font-medium mb-2">Assign Manager (Optional)</label>
            <select
              id="manager"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">None</option>
              {managers.map(manager => (
                <option key={manager._id} value={manager._id}>{manager.name}</option>
              ))}
            </select>
          </div>
        </div>
        <Button type="submit" variant="primary">Create User</Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Users List */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Existing Users</h4>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user._id} className="p-3 bg-gray-50 border rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{user.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;