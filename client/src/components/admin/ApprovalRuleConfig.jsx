import React, { useState, useEffect } from 'react';
// Mock services until you build the real ones
const mockWorkflowService = {
  getWorkflows: async () => Promise.resolve({ data: [{ _id: '1', name: 'Standard Approval' }] }),
  createWorkflow: async (data) => Promise.resolve({ data }),
};
const mockAdminService = {
  getAllUsers: async () => Promise.resolve({ data: [{ _id: '1', name: 'John Doe', role: 'Manager' }] }),
};

import Input from '../common/Input';
import Button from '../common/Button';

const ApprovalRuleConfig = () => {
  const [workflows, setWorkflows] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialFormState = {
    name: '',
    isManagerApprovalRequired: true,
    approverSequence: [],
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [workflowsRes, usersRes] = await Promise.all([
          mockWorkflowService.getWorkflows(),
          mockAdminService.getAllUsers()
        ]);
        setWorkflows(workflowsRes.data);
        setUsers(usersRes.data.filter(u => u.role === 'Manager' || u.role === 'Admin'));
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mockWorkflowService.createWorkflow(formData);
      alert('Workflow created successfully!');
      setFormData(initialFormState);
      // Here you would refetch the workflows
    } catch (error) {
      alert('Failed to create workflow.');
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading configuration...</div>;

  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-2">Existing Workflows</h4>
      {workflows.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {workflows.map(wf => <li key={wf._id} className="p-2 border rounded-md bg-gray-50 text-sm">{wf.name}</li>)}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm mb-4">No workflows defined yet.</p>
      )}
      <Button>Create New Workflow</Button>
    </div>
  );
};

export default ApprovalRuleConfig;