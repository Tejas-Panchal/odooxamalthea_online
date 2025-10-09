import React, { useState, useEffect } from 'react';
import { createWorkflow, getWorkflows, getAllUsers } from '../../services/adminService';
import Input from '../common/Input';
import Button from '../common/Button';

const WorkflowEditor = () => {
  const [workflows, setWorkflows] = useState([]);
  const [users, setUsers] = useState([]); // To populate approver dropdowns
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    isManagerApprovalRequired: true,
    approverSequence: [],
    ruleType: 'None',
    percentageRequired: '',
    specificApprover: '',
  });

  // Fetch initial data (existing workflows and all users)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const workflowsRes = await getWorkflows();
        const usersRes = await getAllUsers();
        console.log(workflowsRes, usersRes);
        setWorkflows(workflowsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load initial data.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleApproverChange = (e) => {
    // Handle multi-select for approver sequence
    const selectedApprovers = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, approverSequence: selectedApprovers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createWorkflow(formData);
      alert('Workflow created successfully!');
      // Refresh list and reset form
      const res = await getWorkflows();
      setWorkflows(res.data);
      setFormData({ name: '', isManagerApprovalRequired: true, approverSequence: [], ruleType: 'None', percentageRequired: '', specificApprover: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create workflow.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Approval Workflow Management</h3>
      
      {/* Create Workflow Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h4 className="text-lg font-medium text-gray-700">Create New Workflow</h4>
        <Input label="Workflow Name" name="name" value={formData.name} onChange={handleChange} required />
        
        <div className="flex items-center">
          <input type="checkbox" id="isManagerApprovalRequired" name="isManagerApprovalRequired" checked={formData.isManagerApprovalRequired} onChange={handleChange} className="h-4 w-4 rounded" />
          <label htmlFor="isManagerApprovalRequired" className="ml-2 block text-sm text-gray-900">Employee's Manager must approve first</label>
        </div>

        <div>
          <label htmlFor="approverSequence" className="block font-medium">Approval Sequence (after manager)</label>
          <p className="text-sm text-gray-500 mb-1">Hold Ctrl or Cmd to select multiple approvers in order.</p>
          <select id="approverSequence" name="approverSequence" multiple value={formData.approverSequence} onChange={handleApproverChange} className="w-full p-2 border rounded-md">
            {users.map(user => <option key={user._id} value={user._id}>{user.name} ({user.role})</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="ruleType" className="block font-medium">Conditional Rule</label>
          <select id="ruleType" name="ruleType" value={formData.ruleType} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="None">None (All must approve)</option>
            <option value="Percentage">Percentage</option>
            <option value="Specific">Specific Approver</option>
            <option value="Hybrid">Hybrid (Percentage OR Specific)</option>
          </select>
        </div>

        {/* Conditional Inputs */}
        {formData.ruleType === 'Percentage' || formData.ruleType === 'Hybrid' ? (
          <Input label="Approval Percentage (%)" type="number" name="percentageRequired" value={formData.percentageRequired} onChange={handleChange} />
        ) : null}

        {formData.ruleType === 'Specific' || formData.ruleType === 'Hybrid' ? (
          <div>
            <label htmlFor="specificApprover" className="block font-medium">Key Approver</label>
            <select id="specificApprover" name="specificApprover" value={formData.specificApprover} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Select a user</option>
              {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
            </select>
          </div>
        ) : null}

        <Button type="submit" variant="primary">Save Workflow</Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      
      {/* Existing Workflows List */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Existing Workflows</h4>
        <div className="space-y-3">
          {workflows.map(wf => (
            <div key={wf._id} className="p-3 bg-gray-50 border rounded-md">
              <p className="font-bold">{wf.name}</p>
              <p className="text-sm">Approvers: {wf.approverSequence.map(a => a.name).join(' → ') || 'None'}</p>
              <p className="text-sm">Rule: <span className="font-semibold">{wf.ruleType}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;