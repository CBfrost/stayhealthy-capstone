import React, { useState } from 'react';
import './FindDoctorSearch.css';

const FindDoctorSearch = ({ onDoctorSelect }) => {
  const [searchFilters, setSearchFilters] = useState({
    specialty: '',
    location: '',
    availability: '',
    name: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      location: 'New York, NY',
      rating: 4.9,
      experience: '15 years',
      availability: 'Available Today',
      nextSlot: '2:30 PM',
      image: '👩‍⚕️',
      consultationFee: 250,
      reviews: 120
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      location: 'Los Angeles, CA',
      rating: 4.8,
      experience: '12 years',
      availability: 'Available Tomorrow',
      nextSlot: '10:00 AM',
      image: '👨‍⚕️',
      consultationFee: 120,
      reviews: 95
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Neurology',
      location: 'Chicago, IL',
      rating: 4.9,
      experience: '10 years',
      availability: 'Available Today',
      nextSlot: '4:00 PM',
      image: '👩‍⚕️',
      consultationFee: 320,
      reviews: 88
    },
    {
      id: 4,
      name: 'Dr. David Williams',
      specialty: 'Dermatology',
      location: 'Miami, FL',
      rating: 4.7,
      experience: '8 years',
      availability: 'Available Today',
      nextSlot: '11:30 AM',
      image: '👨‍⚕️',
      consultationFee: 150,
      reviews: 76
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'General Medicine',
      location: 'Seattle, WA',
      rating: 4.8,
      experience: '14 years',
      availability: 'Available Tomorrow',
      nextSlot: '9:00 AM',
      image: '👩‍⚕️',
      consultationFee: 85,
      reviews: 134
    }
  ];

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'General Medicine',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Psychiatry'
  ];

  const locations = [
    'All Locations',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Miami, FL',
    'Seattle, WA'
  ];

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = doctors;

      if (searchFilters.specialty && searchFilters.specialty !== 'All Specialties') {
        filtered = filtered.filter(doctor => 
          doctor.specialty.toLowerCase().includes(searchFilters.specialty.toLowerCase())
        );
      }

      if (searchFilters.location && searchFilters.location !== 'All Locations') {
        filtered = filtered.filter(doctor => 
          doctor.location.toLowerCase().includes(searchFilters.location.toLowerCase())
        );
      }

      if (searchFilters.name) {
        filtered = filtered.filter(doctor => 
          doctor.name.toLowerCase().includes(searchFilters.name.toLowerCase())
        );
      }

      if (searchFilters.availability) {
        filtered = filtered.filter(doctor => 
          doctor.availability.toLowerCase().includes(searchFilters.availability.toLowerCase())
        );
      }

      setSearchResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handleBookConsultation = (doctor) => {
    if (onDoctorSelect) {
      onDoctorSelect(doctor);
    }
  };

  return (
    <div className="find-doctor-search">
      <div className="search-header">
        <h1>Find Your Perfect Doctor</h1>
        <p>Search and book appointments with qualified healthcare professionals</p>
      </div>

      <div className="search-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="doctor-name">Doctor Name</label>
            <input
              type="text"
              id="doctor-name"
              placeholder="Search by doctor name..."
              value={searchFilters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="specialty">Specialty</label>
            <select
              id="specialty"
              value={searchFilters.specialty}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              value={searchFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              value={searchFilters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
            >
              <option value="">Any Time</option>
              <option value="today">Available Today</option>
              <option value="tomorrow">Available Tomorrow</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>

        <button className="search-btn" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? (
            <>
              <span className="loading-spinner"></span>
              Searching...
            </>
          ) : (
            <>
              <span>🔍</span>
              Search Doctors
            </>
          )}
        </button>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          <>
            <div className="results-header">
              <h2>Found {searchResults.length} Doctor{searchResults.length !== 1 ? 's' : ''}</h2>
              <div className="sort-options">
                <label>Sort by:</label>
                <select>
                  <option>Rating (High to Low)</option>
                  <option>Price (Low to High)</option>
                  <option>Experience</option>
                  <option>Availability</option>
                </select>
              </div>
            </div>

            <div className="doctors-grid">
              {searchResults.map(doctor => (
                <div key={doctor.id} className="doctor-result-card">
                  <div className="doctor-header">
                    <div className="doctor-avatar">{doctor.image}</div>
                    <div className="doctor-basic-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialty">{doctor.specialty}</p>
                      <p className="location">{doctor.location}</p>
                    </div>
                    <div className="doctor-rating">
                      <span className="rating-stars">⭐ {doctor.rating}</span>
                      <span className="review-count">({doctor.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="doctor-details">
                    <div className="detail-item">
                      <span className="label">Experience:</span>
                      <span className="value">{doctor.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Consultation Fee:</span>
                      <span className="value fee">${doctor.consultationFee}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Availability:</span>
                      <span className="value availability">{doctor.availability}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Next Slot:</span>
                      <span className="value next-slot">{doctor.nextSlot}</span>
                    </div>
                  </div>

                  <div className="doctor-actions">
                    <button className="view-profile-btn">
                      View Profile
                    </button>
                    <button 
                      className="book-btn"
                      onClick={() => handleBookConsultation(doctor)}
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : searchResults.length === 0 && !isSearching ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No doctors found</h3>
            <p>Try adjusting your search filters to find more doctors.</p>
          </div>
        ) : null}

        {!searchResults.length && !isSearching && (
          <div className="initial-state">
            <div className="initial-icon">👩‍⚕️</div>
            <h3>Start Your Search</h3>
            <p>Use the filters above to find the perfect doctor for your needs.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
