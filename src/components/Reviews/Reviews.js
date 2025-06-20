import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import './Reviews.css';

const Reviews = ({ user, addNotification }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatrics' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Neurology' },
    { id: 4, name: 'Dr. David Williams', specialty: 'Dermatology' },
    { id: 5, name: 'Dr. Lisa Thompson', specialty: 'General Medicine' }
  ];

  const existingReviews = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Cardiology',
      rating: 5,
      reviewText: 'Dr. Johnson was incredibly thorough and professional. She took the time to explain my condition clearly and answered all my questions. The appointment was well-organized, and I felt comfortable throughout the consultation. Highly recommend!',
      date: '2024-03-10',
      helpful: 12
    },
    {
      id: 2,
      patientName: 'Maria Smith',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'Pediatrics',
      rating: 4,
      reviewText: 'Great experience with Dr. Chen for my daughter\'s checkup. He was patient and gentle with her, making the visit stress-free. The clinic staff was also very friendly and efficient.',
      date: '2024-03-08',
      helpful: 8
    },
    {
      id: 3,
      patientName: 'Alex Rodriguez',
      doctorName: 'Dr. Emily Rodriguez',
      doctorSpecialty: 'Neurology',
      rating: 5,
      reviewText: 'Outstanding neurologist! Dr. Rodriguez diagnosed my condition accurately and provided a comprehensive treatment plan. Her expertise and caring approach made all the difference in my recovery.',
      date: '2024-03-05',
      helpful: 15
    }
  ];

  useEffect(() => {
    setReviews(existingReviews);
  }, []);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const isSubmitDisabled = !selectedDoctor || rating === 0 || reviewText.trim().length === 0;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      addNotification('Please login to submit a review', 'warning');
      navigate('/login');
      return;
    }

    if (isSubmitDisabled) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedDoctorInfo = doctors.find(d => d.id === parseInt(selectedDoctor));
      
      const newReview = {
        id: Date.now(),
        patientName: user.name,
        doctorName: selectedDoctorInfo.name,
        doctorSpecialty: selectedDoctorInfo.specialty,
        rating,
        reviewText: reviewText.trim(),
        date: new Date().toISOString().split('T')[0],
        helpful: 0
      };

      setReviews(prev => [newReview, ...prev]);
      
      // Reset form
      setSelectedDoctor('');
      setRating(0);
      setReviewText('');
      setShowReviewForm(false);
      
      addNotification('Review submitted successfully!', 'success');
    } catch (error) {
      addNotification('Failed to submit review. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => onStarClick(index) : undefined}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const getRatingText = (rating) => {
    const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return ratingTexts[rating] || '';
  };

  return (
    <div className="reviews-page">
      <Navbar user={user} />
      
      <div className="reviews-container">
        <div className="reviews-header">
          <h1>Doctor Reviews & Ratings</h1>
          <p>Share your experience and help others make informed healthcare decisions</p>
          
          {user && (
            <button
              className="write-review-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className="review-form-container">
            <form onSubmit={handleSubmitReview} className="review-form">
              <h2>Write Your Review</h2>
              
              <div className="form-group">
                <label htmlFor="doctor-select">Select Doctor *</label>
                <select
                  id="doctor-select"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Choose a doctor you visited</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rate Your Experience *</label>
                <div className="rating-selector">
                  {renderStars(rating, true, handleStarClick)}
                  <span className="rating-text">
                    {rating > 0 && `${getRatingText(rating)} - ${rating} star${rating > 1 ? 's' : ''}`}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="review-text">Your Review *</label>
                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this doctor. How was the consultation? Would you recommend them to others?"
                  rows="5"
                  required
                />
                <div className="character-count">
                  {reviewText.length}/500 characters
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`submit-btn ${isSubmitDisabled ? 'disabled' : ''}`}
                  disabled={isSubmitDisabled || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="reviews-section">
          <div className="reviews-stats">
            <h2>Patient Reviews ({reviews.length})</h2>
            <div className="average-rating">
              <span className="avg-number">4.8</span>
              <div className="avg-stars">{renderStars(5)}</div>
              <span className="avg-text">Average Rating</span>
            </div>
          </div>

          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="reviewer-details">
                      <h4>{review.patientName}</h4>
                      <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="rating-number">{review.rating}.0</span>
                  </div>
                </div>

                <div className="review-doctor">
                  <strong>{review.doctorName}</strong> - {review.doctorSpecialty}
                </div>

                <div className="review-content">
                  {review.reviewText}
                </div>

                <div className="review-footer">
                  <button className="helpful-btn">
                    👍 Helpful ({review.helpful})
                  </button>
                  <button className="reply-btn">
                    💬 Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
