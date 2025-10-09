import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUser, getAllUsers } from '../../services/adminService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Layout from '../../components/layout/Layout'; 1
import { useNavigate } from 'react-router-dom';// Use the main layout for consistency

const CreateUserPage = () => {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
    manager: '',
  });
  const navigate = useNavigate();

  // Fetch only managers for the dropdown
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await getAllUsers();
        setManagers(res.data.filter(user => user.role === 'Manager' || user.role === 'Admin'));
      } catch (err) {
        setError('Failed to fetch managers list.');
      }
    };
    fetchManagers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createUser(formData);
      setSuccess('User created successfully!');
      // Reset form after successful creation
      setFormData({ name: '', email: '', password: '', role: 'Employee', manager: '' });
      navigate('/dashboard'); // Redirect to user list page
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create user.');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Create New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Input label="Temporary Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            <div>
              <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div>
              <label htmlFor="manager" className="block text-gray-700 font-medium mb-2">Assign Manager (Optional)</label>
              <select id="manager" name="manager" value={formData.manager} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">None</option>
                {managers.map(manager => (
                  <option key={manager._id} value={manager._id}>{manager.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" variant="primary">Create User</Button>
              <Link to="/dashboard" className="text-sm text-blue-500 hover:underline">Cancel</Link>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUserPage;