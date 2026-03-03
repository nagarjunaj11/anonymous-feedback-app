import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaComments, FaUser, FaEnvelope, FaLock, FaBriefcase, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { authAPI } from '../services/api';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    profileType: 'OTHER',
    bio: '',
    upiId: '',
  });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
  const [messageText, setMessageText] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      // Show success message in center
      setMessageType('success');
      setMessageText('Registration successful! Redirecting to dashboard...');
      setShowMessage(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      // Show error message in center
      setMessageType('error');
      setMessageText(error.response?.data?.error || 'Registration failed. Please try again.');
      setShowMessage(true);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <div className="logo">
              <FaComments className="logo-icon" />
              <span>FeedbackHub</span>
            </div>
            <h2>Create Your Account</h2>
            <p>Start collecting anonymous feedback today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="username">
                <FaUser /> Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <FaEnvelope /> Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <FaLock /> Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
            </div>

            <div className="input-group">
              <label htmlFor="fullName">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="profileType">
                <FaBriefcase /> Profile Type
              </label>
              <select
                id="profileType"
                name="profileType"
                value={formData.profileType}
                onChange={handleChange}
              >
                <option value="MANAGER">Manager</option>
                <option value="YOUTUBER">YouTuber/Content Creator</option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself (optional)"
                rows="3"
              />
            </div>

            <div className="input-group">
              <label htmlFor="upiId">UPI ID (for donations)</label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="yourname@upi (optional)"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Centered Message Modal */}
      {showMessage && (
        <div className="message-overlay">
          <div className={`message-box ${messageType}`}>
            <div className="message-icon">
              {messageType === 'success' ? (
                <FaCheckCircle className="success-icon" />
              ) : (
                <FaTimesCircle className="error-icon" />
              )}
            </div>
            <h2>{messageType === 'success' ? 'Success!' : 'Error!'}</h2>
            <p>{messageText}</p>
            {messageType === 'error' && (
              <button
                onClick={() => setShowMessage(false)}
                className="btn btn-primary"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
