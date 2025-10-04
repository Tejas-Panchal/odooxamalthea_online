import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createWorkflow, getAllUsers } from '../../services/adminService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const CreateWorkflowPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    isManagerApprovalRequired: true,
    approverSequence: [],
    ruleType: 'None',
    percentageRequired: '',
    specificApprover: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await getAllUsers();
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load user data for approvers.');
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };
  
  const handleApproverChange = (e) => {
    const selectedApprovers = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, approverSequence: selectedApprovers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createWorkflow(formData);
      setSuccess('Workflow created successfully!');
      setFormData({ name: '', isManagerApprovalRequired: true, approverSequence: [], ruleType: 'None', percen1tageRequired: '', specificApprover: '' });
      navigate('/dashboard'); // Redirect to dashboard or workflow list page
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create workflow.');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Create New Approval Workflow</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Workflow Name" name="name" value={formData.name} onChange={handleChange} required />
            <div className="flex items-center">
              <input type="checkbox" id="isManagerApprovalRequired" name="isManagerApprovalRequired" checked={formData.isManagerApprovalRequired} onChange={handleChange} className="h-4 w-4 rounded" />
              <label htmlFor="isManagerApprovalRequired" className="ml-2 block text-sm text-gray-900">Employee's Manager must approve first</label>
            </div>
            <div>
              <label htmlFor="approverSequence" className="block font-medium">Approval Sequence (after manager)</label>
              <p className="text-sm text-gray-500 mb-1">Hold Ctrl or Cmd to select multiple approvers in order.</p>
              <select id="approverSequence" name="approverSequence" multiple value={formData.approverSequence} onChange={handleApproverChange} className="w-full p-2 border rounded-md h-32">
                {users.map(user => <option key={user._id} value={user._id}>{user.name} ({user.role})</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ruleType" className="block font-medium">Conditional Rule</label>
              <select id="ruleType" name="ruleType" value={formData.ruleType} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option value="None">None (All must approve)</option>
                <option value="Percentage">Percentage</option>
                <option value="Specific">Specific Approver</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            {(formData.ruleType === 'Percentage' || formData.ruleType === 'Hybrid') && (
              <Input label="Approval Percentage (%)" type="number" name="percentageRequired" value={formData.percentageRequired} onChange={handleChange} />
            )}
            {(formData.ruleType === 'Specific' || formData.ruleType === 'Hybrid') && (
              <div>
                <label htmlFor="specificApprover" className="block font-medium">Key Approver</label>
                <select id="specificApprover" name="specificApprover" value={formData.specificApprover} onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="">Select a user</option>
                  {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                </select>
              </div>
            )}
            <div className="flex items-center justify-between">
              <Button type="submit" variant="primary">Save Workflow</Button>
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

export default CreateWorkflowPage;