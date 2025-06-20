import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import './LandingPage.css';

const LandingPage = ({ user, onLogout }) => {
  const featuredServices = [
    {
      id: 1,
      title: 'General Medicine',
      description: 'Comprehensive primary healthcare services for all your medical needs',
      icon: '🩺',
      price: 'From $85'
    },
    {
      id: 2,
      title: 'Cardiology',
      description: 'Expert heart and cardiovascular care with advanced diagnostic tools',
      icon: '❤️',
      price: 'From $250'
    },
    {
      id: 3,
      title: 'Pediatrics',
      description: 'Specialized care for children and infants with child-friendly environment',
      icon: '👶',
      price: 'From $120'
    },
    {
      id: 4,
      title: 'Neurology',
      description: 'Advanced neurological care and treatment for brain and nerve disorders',
      icon: '🧠',
      price: 'From $320'
    }
  ];

  const featuredDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: '15 years',
      image: '👩‍⚕️',
      reviews: 120
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      rating: 4.8,
      experience: '12 years',
      image: '👨‍⚕️',
      reviews: 95
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Neurologist',
      rating: 4.9,
      experience: '10 years',
      image: '👩‍⚕️',
      reviews: 88
    }
  ];

  return (
    <div className="landing-page">
      <Navbar user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Health is Our <span className="gradient-text">Priority</span>
            </h1>
            <p className="hero-description">
              Connect with experienced doctors, book appointments instantly, 
              and take control of your healthcare journey with StayHealthy+
            </p>
            <div className="hero-buttons">
              <Link to="/booking" className="btn-primary">
                <span>📅</span>
                Book Appointment
              </Link>
              <Link to="/reviews" className="btn-secondary">
                <span>⭐</span>
                Read Reviews
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Expert Doctors</span>
              </div>
              <div className="stat">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Happy Patients</span>
              </div>
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Specialties</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="medical-icons">
                <span className="icon floating">🏥</span>
                <span className="icon floating-delayed">💊</span>
                <span className="icon floating-slow">🩺</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose StayHealthy+?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Schedule appointments with just a few clicks. Our streamlined booking system makes healthcare accessible.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👩‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Access to qualified and experienced healthcare professionals across multiple specialties.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Smart Reminders</h3>
              <p>Never miss an appointment with our intelligent notification system and health reminders.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access your health dashboard anywhere, anytime from any device with full mobile support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Medical Services</h2>
          <div className="services-grid">
            {featuredServices.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
                <Link to="/booking" className="service-link">
                  Book Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <div className="container">
          <h2 className="section-title">Meet Our Expert Doctors</h2>
          <div className="doctors-grid">
            {featuredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image">{doctor.image}</div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <div className="doctor-stats">
                    <span className="rating">⭐ {doctor.rating}</span>
                    <span className="experience">{doctor.experience} exp</span>
                  </div>
                  <p className="doctor-reviews">{doctor.reviews} reviews</p>
                  <Link to="/booking" className="btn-doctor">
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Consultation Banner */}
      <section className="instant-consultation">
        <div className="container">
          <div className="consultation-content">
            <div className="consultation-text">
              <h2>Need Immediate Medical Attention?</h2>
              <p>Get instant consultation with our emergency doctors available 24/7</p>
              <Link to="/booking" className="btn-emergency">
                <span>🚨</span>
                Start Instant Consultation
              </Link>
            </div>
            <div className="consultation-image">
              <span className="emergency-icon">⚡</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="logo">🏥</span>
              <span>StayHealthy+</span>
              <p>Your trusted healthcare platform providing quality medical services and expert care.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link to="/booking">Book Appointment</Link>
              <Link to="/reviews">Doctor Reviews</Link>
              <Link to="/profile">My Profile</Link>
              <Link to="/reports">Health Reports</Link>
            </div>
            <div className="footer-contact">
              <h4>Emergency Contact</h4>
              <p>📞 Emergency: (555) 911-HELP</p>
              <p>📧 support@stayhealthyplus.com</p>
              <p>📍 123 Health Street, Medical City</p>
              <p>🕒 24/7 Emergency Care Available</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 StayHealthy+ | Healthcare Platform Capstone Project by CBfrost</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
