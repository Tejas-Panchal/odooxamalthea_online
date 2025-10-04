import React, { useState, useEffect } from 'react';
import { getWorkflows } from '../../services/adminService';

const WorkflowListSummary = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const res = await getWorkflows();
        setWorkflows(res.data);
      } catch (err) {
        console.error("Failed to fetch workflows for summary.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  if (loading) return <div className="text-center p-4">Loading workflows...</div>;

  return (
    <div className="space-y-3">
      {workflows.length > 0 ? (
        workflows.map(wf => (
          <div key={wf._id} className="p-3 bg-gray-50 border rounded-md">
            <p className="font-bold">{wf.name}</p>
            <p className="text-sm text-gray-600 truncate">
              Rule: {wf.ruleType}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No workflows configured yet.</p>
      )}
    </div>
  );
};

export default WorkflowListSummary;