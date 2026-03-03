import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaComments, FaEnvelope, FaLock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { authAPI } from '../services/api';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
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
      const response = await authAPI.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      // Show success message in center
      setMessageType('success');
      setMessageText('Login successful! Redirecting to dashboard...');
      setShowMessage(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      // Show error message in center
      setMessageType('error');
      setMessageText(error.response?.data?.error || 'Login failed. Please check your credentials.');
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
            <h2>Welcome Back</h2>
            <p>Login to access your feedback dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="username">
                <FaEnvelope /> Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
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

export default Login;
