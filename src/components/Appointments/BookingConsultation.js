import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import FindDoctorSearch from './FindDoctorSearch';
import './BookingConsultation.css';

const BookingConsultation = ({ user, addNotification }) => {
  const [currentStep, setCurrentStep] = useState('search');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({
    doctor: null,
    date: '',
    time: '',
    patientInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      reason: '',
      notes: ''
    }
  });
  const navigate = useNavigate();

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingData(prev => ({
      ...prev,
      doctor: doctor
    }));
    setCurrentStep('schedule');
  };

  const handleScheduleSelect = (date, time) => {
    setBookingData(prev => ({
      ...prev,
      date,
      time
    }));
    setCurrentStep('confirm');
  };

  const handleBookingConfirm = async (finalBookingData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification(
        `Appointment booked successfully with ${finalBookingData.doctor.name} on ${finalBookingData.date} at ${finalBookingData.time}`,
        'success'
      );
      
      if (user) {
        navigate('/profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      addNotification('Failed to book appointment. Please try again.', 'error');
    }
  };

  return (
    <div className="booking-consultation">
      <Navbar user={user} />
      
      <div className="booking-container">
        <div className="booking-progress">
          <div className={`progress-step ${currentStep === 'search' ? 'active' : currentStep !== 'search' ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Find Doctor</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep === 'schedule' ? 'active' : currentStep === 'confirm' ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Schedule</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep === 'confirm' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Confirm</span>
          </div>
        </div>

        {currentStep === 'search' && (
          <FindDoctorSearch onDoctorSelect={handleDoctorSelect} />
        )}

        {currentStep === 'schedule' && (
          <ScheduleSelection
            doctor={selectedDoctor}
            onScheduleSelect={handleScheduleSelect}
            onBack={() => setCurrentStep('search')}
          />
        )}

        {currentStep === 'confirm' && (
          <BookingConfirmation
            bookingData={bookingData}
            setBookingData={setBookingData}
            onConfirm={handleBookingConfirm}
            onBack={() => setCurrentStep('schedule')}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

const ScheduleSelection = ({ doctor, onScheduleSelect, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        available: Math.random() > 0.3 // 70% chance of being available
      });
    }
    
    return dates;
  };

  const generateTimeSlots = () => {
    const slots = [];
    const times = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];
    
    return times.map(time => ({
      time,
      available: Math.random() > 0.4 // 60% chance of being available
    }));
  };

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const dateObj = new Date(selectedDate);
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      onScheduleSelect(formattedDate, selectedTime);
    }
  };

  return (
    <div className="schedule-selection">
      <div className="schedule-header">
        <h2>Schedule Your Appointment</h2>
        <div className="selected-doctor">
          <div className="doctor-info">
            <span className="doctor-avatar">{doctor.image}</span>
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p className="consultation-fee">${doctor.consultationFee} consultation fee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="scheduling-grid">
        <div className="date-selection">
          <h3>Select Date</h3>
          <div className="dates-grid">
            {availableDates.map(({ date, display, available }) => (
              <button
                key={date}
                className={`date-slot ${!available ? 'unavailable' : ''} ${selectedDate === date ? 'selected' : ''}`}
                onClick={() => available && setSelectedDate(date)}
                disabled={!available}
              >
                <span className="date-display">{display}</span>
                {!available && <span className="unavailable-label">Not Available</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="time-selection">
          <h3>Available Times</h3>
          {selectedDate ? (
            <div className="times-grid">
              {timeSlots.map(({ time, available }) => (
                <button
                  key={time}
                  className={`time-slot ${!available ? 'unavailable' : ''} ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => available && setSelectedTime(time)}
                  disabled={!available}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="no-date-selected">
              <p>Please select a date first</p>
            </div>
          )}
        </div>
      </div>

      <div className="schedule-actions">
        <button className="btn-back" onClick={onBack}>
          ← Back to Search
        </button>
        <button 
          className="btn-continue" 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          Continue to Confirmation →
        </button>
      </div>
    </div>
  );
};

const BookingConfirmation = ({ bookingData, setBookingData, onConfirm, onBack, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ...bookingData.patientInfo
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    setBookingData(prev => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const finalBookingData = {
      ...bookingData,
      patientInfo: formData,
      bookingId: `APT${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    await onConfirm(finalBookingData);
    setIsSubmitting(false);
  };

  return (
    <div className="booking-confirmation">
      <div className="confirmation-header">
        <h2>Confirm Your Appointment</h2>
        <p>Please review your appointment details and provide additional information</p>
      </div>

      <div className="confirmation-grid">
        <div className="appointment-summary">
          <h3>Appointment Summary</h3>
          <div className="summary-card">
            <div className="doctor-summary">
              <span className="doctor-avatar">{bookingData.doctor.image}</span>
              <div>
                <h4>{bookingData.doctor.name}</h4>
                <p>{bookingData.doctor.specialty}</p>
                <p className="location">{bookingData.doctor.location}</p>
              </div>
            </div>
            
            <div className="appointment-details">
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">{bookingData.date}</span>
              </div>
              <div className="detail-row">
                <span className="label">Time:</span>
                <span className="value">{bookingData.time}</span>
              </div>
              <div className="detail-row">
                <span className="label">Duration:</span>
                <span className="value">30 minutes</span>
              </div>
              <div className="detail-row">
                <span className="label">Consultation Fee:</span>
                <span className="value fee">${bookingData.doctor.consultationFee}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-information">
          <h3>Patient Information</h3>
          <div className="patient-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Reason for Visit *</label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  required
                >
                  <option value="">Select reason</option>
                  <option value="routine-checkup">Routine Checkup</option>
                  <option value="follow-up">Follow-up Visit</option>
                  <option value="new-symptoms">New Symptoms</option>
                  <option value="chronic-condition">Chronic Condition Management</option>
                  <option value="preventive-care">Preventive Care</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information or specific concerns..."
                rows="4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="btn-back" onClick={onBack}>
          ← Back to Schedule
        </button>
        <button 
          className="btn-confirm" 
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.reason}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Booking...
            </>
          ) : (
            'Confirm Appointment'
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingConsultation;
