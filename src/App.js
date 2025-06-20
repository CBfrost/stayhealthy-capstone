import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Components
import LandingPage from './components/Landing/LandingPage';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import BookingConsultation from './components/Appointments/BookingConsultation';
import Reviews from './components/Reviews/Reviews';
import ProfileCard from './components/Profile/ProfileCard';
import ReportsLayout from './components/Reports/ReportsLayout';
import Notification from './components/Notifications/Notification';

function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('stayhealthy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Add notification function
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // Login function
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('stayhealthy_user', JSON.stringify(userData));
    addNotification(`Welcome back, ${userData.name}!`, 'success');
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('stayhealthy_user');
    addNotification('You have been logged out successfully.', 'info');
  };

  return (
    <Router>
      <div className="App">
        <Notification notifications={notifications} />
        
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage user={user} onLogout={handleLogout} />} 
          />
          <Route 
            path="/login" 
            element={
              user ? 
              <Navigate to="/profile" /> : 
              <Login onLogin={handleLogin} addNotification={addNotification} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              user ? 
              <Navigate to="/profile" /> : 
              <SignUp onLogin={handleLogin} addNotification={addNotification} />
            } 
          />
          <Route 
            path="/booking" 
            element={
              <BookingConsultation 
                user={user} 
                addNotification={addNotification}
              />
            } 
          />
          <Route 
            path="/reviews" 
            element={
              <Reviews 
                user={user}
                addNotification={addNotification}
              />
            } 
          />
          <Route 
            path="/profile" 
            element={
              user ? 
              <ProfileCard 
                user={user} 
                setUser={setUser}
                onLogout={handleLogout}
                addNotification={addNotification}
              /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/reports" 
            element={
              user ? 
              <ReportsLayout user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
