import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTeamReport } from '../services/expenseService';
import { DownloadIcon } from '../components/icons'; // Make sure DownloadIcon exists and is exported from icons/index.js
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

// This is the CSV download utility function
const downloadCSV = (data, managerName) => {
  const headers = "Date,Employee Name,Description,Category,Amount,Currency,Status\n";
  
  const rows = data.map(exp => 
    [
      new Date(exp.date).toLocaleDateString(),
      `"${exp.submittedBy.name}"`,
      `"${exp.description.replace(/"/g, '""')}"`,
      exp.category,
      exp.originalAmount.toFixed(2),
      exp.originalCurrency,
      exp.status
    ].join(',')
  ).join('\n');

  const csvContent = headers + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  const fileName = `Team_Report_${managerName.replace(/\s/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
  link.setAttribute("download", fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


const TeamReportPage = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getTeamReport();
        setReportData(res.data);
      } catch (error) {
        console.error("Failed to fetch team report", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [user]); // Added user to dependency array to refetch if user changes

  if (loading) {
    return <DashboardLayout><p>Generating report...</p></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <Card title={`Team Report for ${user?.name}`} actions={
        <button 
          onClick={() => downloadCSV(reportData, user?.name)}
          disabled={reportData.length === 0}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          <DownloadIcon className="h-5 w-5" />
          <span>Download as CSV</span>
        </button>
      }>
        <div className="overflow-x-auto">
          {reportData.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-3 text-sm font-semibold">Date</th>
                  <th className="p-3 text-sm font-semibold">Employee</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                  <th className="p-3 text-sm font-semibold text-right">Amount</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportData.map(exp => (
                  <tr key={exp._id}>
                    <td className="p-3">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="p-3 font-medium">{exp.submittedBy.name}</td>
                    <td className="p-3">{exp.description}</td>
                    <td className="p-3 text-right">{`${exp.originalAmount.toFixed(2)} ${exp.originalCurrency}`}</td>
                    <td className="p-3">{exp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 p-8">No expense data found for your team.</p>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default TeamReportPage;