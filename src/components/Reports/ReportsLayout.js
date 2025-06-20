import React from 'react';
import Navbar from '../Navigation/Navbar';
import './ReportsLayout.css';

const ReportsLayout = ({ user }) => {
  const reports = [
    {
      id: 1,
      title: 'Blood Test Results',
      date: '2024-03-15',
      doctor: 'Dr. Sarah Johnson',
      type: 'Lab Report',
      status: 'Normal',
      description: 'Complete Blood Count with differential'
    },
    {
      id: 2,
      title: 'Chest X-Ray',
      date: '2024-03-10',
      doctor: 'Dr. Michael Chen',
      type: 'Imaging',
      status: 'Clear',
      description: 'Routine chest X-ray examination'
    },
    {
      id: 3,
      title: 'ECG Report',
      date: '2024-03-05',
      doctor: 'Dr. Sarah Johnson',
      type: 'Diagnostic',
      status: 'Normal',
      description: 'Electrocardiogram test results'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'clear':
        return 'status-normal';
      case 'abnormal':
      case 'urgent':
        return 'status-abnormal';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-normal';
    }
  };

  return (
    <div className="reports-page">
      <Navbar user={user} />
      
      <div className="reports-container">
        <div className="reports-header">
          <h1>Medical Reports</h1>
          <p>View and download your medical reports and test results</p>
        </div>

        <div className="reports-grid">
          {reports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <h3>{report.title}</h3>
                <span className={`report-status ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              
              <div className="report-details">
                <p className="report-type">{report.type}</p>
                <p className="report-description">{report.description}</p>
                <p className="report-meta">
                  <span>📅 {new Date(report.date).toLocaleDateString()}</span>
                  <span>👨‍⚕️ {report.doctor}</span>
                </p>
              </div>
              
              <div className="report-actions">
                <button className="view-btn">👁️ View</button>
                <button className="download-btn">📥 Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsLayout;
