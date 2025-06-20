import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="logo">🏥</span>
          <span className="brand-name">StayHealthy+</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Find Doctors</Link>
          <Link to="/reviews" className="nav-link">Reviews</Link>
          
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="nav-link user-profile">
                <span className="user-avatar">👤</span>
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-cta">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
