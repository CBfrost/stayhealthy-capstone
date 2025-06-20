import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import './ProfileCard.css';

const ProfileCard = ({ user, setUser, onLogout, addNotification }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || '',
    bloodType: user?.bloodType || '',
    allergies: user?.allergies || '',
    medicalHistory: user?.medicalHistory || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-page">
        <Navbar user={user} onLogout={onLogout} />
        <div className="not-logged-in">
          <h2>Please login to view your profile</h2>
          <button onClick={() => navigate('/login')} className="login-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedUser = {
        ...user,
        ...formData
      };
      
      setUser(updatedUser);
      localStorage.setItem('stayhealthy_user', JSON.stringify(updatedUser));
      setIsEditing(false);
      addNotification('Profile updated successfully!', 'success');
    } catch (error) {
      addNotification('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      address: user?.address || '',
      emergencyContact: user?.emergencyContact || '',
      bloodType: user?.bloodType || '',
      allergies: user?.allergies || '',
      medicalHistory: user?.medicalHistory || ''
    });
    setIsEditing(false);
  };

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-03-15',
      time: '2:30 PM',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2024-03-22',
      time: '10:00 AM',
      status: 'pending'
    }
  ];

  const medicalRecords = [
    {
      id: 1,
      type: 'Prescription',
      description: 'Blood Pressure Medication',
      date: '2024-03-10',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      type: 'Lab Results',
      description: 'Complete Blood Count',
      date: '2024-03-08',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 3,
      type: 'Imaging',
      description: 'Chest X-Ray',
      date: '2024-03-05',
      doctor: 'Dr. Sarah Johnson'
    }
  ];

  return (
    <div className="profile-page">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and health records</p>
        </div>

        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                {user.name?.split(' ').map(n => n[0]).join('') || '👤'}
              </div>
              <h2>{user.name}</h2>
              <p className="user-email">{user.email}</p>
              <p className="member-since">
                Member since {new Date(user.joinDate || Date.now()).getFullYear()}
              </p>
              
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{appointments.length}</span>
                  <span className="stat-label">Appointments</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{medicalRecords.length}</span>
                  <span className="stat-label">Records</span>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <button 
                className="action-btn book-appointment"
                onClick={() => navigate('/booking')}
              >
                📅 Book Appointment
              </button>
              <button 
                className="action-btn view-records"
                onClick={() => navigate('/reports')}
              >
                📋 View Records
              </button>
              <button 
                className="action-btn emergency"
                onClick={() => navigate('/booking')}
              >
                🚨 Emergency Consultation
              </button>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <div className="section-header">
                <h3>Personal Information</h3>
                {!isEditing ? (
                  <button 
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button 
                      className="cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button 
                      className="save-btn"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="loading-spinner"></span>
                          Saving...
                        </>
                      ) : (
                        '💾 Save Changes'
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="form-value">{user.name || 'Not specified'}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="form-value">{user.email || 'Not specified'}</div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="form-value">{user.phone || 'Not specified'}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      />
                    ) : (
                      <div className="form-value">
                        {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not specified'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="form-value">{user.address || 'Not specified'}</div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        placeholder="Emergency contact number"
                      />
                    ) : (
                      <div className="form-value">{user.emergencyContact || 'Not specified'}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Blood Type</label>
                    {isEditing ? (
                      <select
                        value={formData.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <div className="form-value">{user.bloodType || 'Not specified'}</div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Allergies</label>
                  {isEditing ? (
                    <textarea
                      value={formData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      placeholder="List any known allergies"
                      rows="3"
                    />
                  ) : (
                    <div className="form-value">{user.allergies || 'No known allergies'}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Medical History</label>
                  {isEditing ? (
                    <textarea
                      value={formData.medicalHistory}
                      onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                      placeholder="Brief medical history"
                      rows="3"
                    />
                  ) : (
                    <div className="form-value">{user.medicalHistory || 'No significant medical history'}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Upcoming Appointments</h3>
              <div className="appointments-list">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-info">
                      <h4>{appointment.doctor}</h4>
                      <p className="specialty">{appointment.specialty}</p>
                      <p className="appointment-time">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                    </div>
                    <div className={`appointment-status ${appointment.status}`}>
                      {appointment.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3>Recent Medical Records</h3>
              <div className="records-list">
                {medicalRecords.map(record => (
                  <div key={record.id} className="record-card">
                    <div className="record-icon">
                      {record.type === 'Prescription' ? '💊' :
                       record.type === 'Lab Results' ? '🧪' : '📱'}
                    </div>
                    <div className="record-info">
                      <h4>{record.description}</h4>
                      <p className="record-type">{record.type}</p>
                      <p className="record-date">
                        {new Date(record.date).toLocaleDateString()} - {record.doctor}
                      </p>
                    </div>
                    <button className="view-record-btn">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
