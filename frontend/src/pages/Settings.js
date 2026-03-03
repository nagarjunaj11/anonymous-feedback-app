import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaComments, FaUser, FaEnvelope, FaLock, FaSave, FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { SiPhonepe, SiGooglepay, SiPaytm } from 'react-icons/si';
import axios from 'axios';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    upiId: '',
    createdAt: ''
  });
  const [formData, setFormData] = useState({
    email: '',
    upiId: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Centered message state
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');

  const showCenteredMessage = (type, title, text, autoClose = false, closeDelay = 3000) => {
    setMessageType(type);
    setMessageTitle(title);
    setMessageText(text);
    setShowMessage(true);

    if (autoClose) {
      setTimeout(() => {
        setShowMessage(false);
      }, closeDelay);
    }
  };

  const loadProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8081/api'}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProfile(response.data);
      setFormData({
        email: response.data.email || '',
        upiId: response.data.upiId || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Load profile error:', error);
      showCenteredMessage('error', 'Error!', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords if changing
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        showCenteredMessage('warning', 'Validation Error', 'Please enter your current password to change password');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        showCenteredMessage('warning', 'Validation Error', 'New passwords do not match');
        return;
      }
      if (formData.newPassword.length < 6) {
        showCenteredMessage('warning', 'Validation Error', 'New password must be at least 6 characters');
        return;
      }
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const updateData = {
        email: formData.email,
        upiId: formData.upiId
      };

      // Only include password fields if changing password
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8081/api'}/user/profile`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      showCenteredMessage('success', 'Success!', 'Profile updated successfully', true, 3000);

      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Reload profile
      setTimeout(() => {
        loadProfile();
      }, 1000);

    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to update profile';
      showCenteredMessage('error', 'Update Failed!', errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="container">
        <div className="settings-header">
          <Link to="/dashboard" className="back-button">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <div className="logo">
            <FaComments className="logo-icon" />
            <span>FeedbackHub</span>
          </div>
          <h1>Profile Settings</h1>
          <p>Manage your account information and preferences</p>
        </div>

        <div className="settings-content">
          <div className="profile-card card">
            <div className="profile-header">
              <div className="profile-avatar">
                {profile.username?.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{profile.username}</h2>
                <p>Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="settings-form">
              <div className="form-section">
                <h3>Basic Information</h3>

                <div className="input-group">
                  <label htmlFor="username">
                    <FaUser /> Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={profile.username}
                    disabled
                    className="disabled-input"
                  />
                  <small>Username cannot be changed</small>
                </div>

                <div className="input-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Information</h3>
                <div className="input-group">
                  <label htmlFor="upiId">
                    UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="yourname@paytm"
                  />
                  <small>
                    Add your UPI ID to receive donations from people who submit feedback
                  </small>
                  <div className="payment-icons">
                    <SiPhonepe className="payment-icon phonepe" />
                    <SiGooglepay className="payment-icon gpay" />
                    <SiPaytm className="payment-icon paytm" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Change Password (Optional)</h3>

                <div className="input-group">
                  <label htmlFor="currentPassword">
                    <FaLock /> Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="newPassword">
                    <FaLock /> New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">
                    <FaLock /> Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Centered Message Modal */}
      {showMessage && (
        <div className="message-overlay" onClick={() => setShowMessage(false)}>
          <div className={`message-box ${messageType}`} onClick={(e) => e.stopPropagation()}>
            <div className="message-icon">
              {messageType === 'success' && <FaCheckCircle className="success-icon" />}
              {messageType === 'error' && <FaTimesCircle className="error-icon" />}
              {messageType === 'warning' && <FaTimesCircle className="warning-icon" />}
            </div>
            <h2>{messageTitle}</h2>
            <p>{messageText}</p>
            <button
              onClick={() => setShowMessage(false)}
              className="btn btn-primary"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
