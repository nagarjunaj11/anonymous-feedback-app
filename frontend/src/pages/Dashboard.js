import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaPlus, FaSignOutAlt, FaComments, FaCopy, FaTrash, FaEye, FaShareAlt,
  FaWhatsapp, FaFacebook, FaTwitter, FaTelegram, FaEnvelope, FaCheckCircle,
  FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaCog
} from 'react-icons/fa';
import { feedbackAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'WORK',
    allowMultipleResponses: true,
    requireApproval: false,
  });

  // Centered message state
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success'); // 'success', 'error', 'info', 'warning'
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    loadForms();
  }, []);

  // Helper function to show centered messages
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

  const loadForms = async () => {
    try {
      const response = await feedbackAPI.getMyForms();
      setForms(response.data);
    } catch (error) {
      console.error('Load forms error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to load forms';
      showCenteredMessage('error', 'Error!', `Failed to load forms: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    showCenteredMessage('success', 'Success!', 'Logged out successfully. Redirecting...', true, 1500);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();
    try {
      const response = await feedbackAPI.createForm(formData);
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        category: 'WORK',
        allowMultipleResponses: true,
        requireApproval: false,
      });
      loadForms();

      // Show success message with the share link
      const shareUrl = response.data.publicUrl;
      navigator.clipboard.writeText(shareUrl);
      showCenteredMessage(
        'success',
        'Feedback Form Created!',
        `Your form has been created successfully!\n\nShare Link: ${shareUrl}\n\nThe link has been copied to your clipboard!`,
        true,
        5000
      );
    } catch (error) {
      console.error('Create form error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to create form';
      showCenteredMessage('error', 'Error!', `Failed to create form: ${errorMessage}`);
    }
  };

  const handleCopyLink = (publicUrl) => {
    navigator.clipboard.writeText(publicUrl);
    showCenteredMessage('info', 'Link Copied!', `Share link copied to clipboard:\n\n${publicUrl}`, true, 3000);
  };

  const handleDeleteForm = async (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await feedbackAPI.deleteForm(formId);
        showCenteredMessage('success', 'Success!', 'Form deleted successfully', true, 2000);
        loadForms();
      } catch (error) {
        showCenteredMessage('error', 'Error!', 'Failed to delete form');
      }
    }
  };

  const handleViewResponses = async (form) => {
    try {
      const response = await feedbackAPI.getFormResponses(form.id);
      setResponses(response.data);
      setSelectedForm(form);
    } catch (error) {
      showCenteredMessage('error', 'Error!', 'Failed to load responses');
    }
  };

  const shareOnWhatsApp = (publicUrl, title) => {
    const text = `Hey! Please share your anonymous feedback with me: ${publicUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = (publicUrl) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`, '_blank');
  };

  const shareOnTwitter = (publicUrl, title) => {
    const text = `Share your anonymous feedback with me!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(publicUrl)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <FaComments className="logo-icon" />
              <span>FeedbackHub</span>
            </div>
            <div className="header-actions">
              <span className="username">@{localStorage.getItem('username')}</span>
              <button onClick={() => navigate('/settings')} className="btn btn-secondary">
                <FaCog /> Settings
              </button>
              <button onClick={handleLogout} className="btn btn-secondary">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-hero">
            <h1>My Feedback Forms</h1>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
              <FaPlus /> Create New Form
            </button>
          </div>

          {/* Forms Grid */}
          {forms.length === 0 ? (
            <div className="empty-state card">
              <FaComments className="empty-icon" />
              <h3>No Feedback Forms Yet</h3>
              <p>Create your first feedback form to start collecting anonymous messages</p>
              <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
                <FaPlus /> Create Your First Form
              </button>
            </div>
          ) : (
            <div className="forms-grid">
              {forms.map((form) => (
                <div key={form.id} className="form-card card">
                  <div className="form-card-header">
                    <h3>{form.title}</h3>
                    <span className={`badge ${form.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {form.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="form-description">{form.description}</p>
                  <div className="form-stats">
                    <div className="stat">
                      <strong>{form.responseCount}</strong>
                      <span>Responses</span>
                    </div>
                    <div className="stat">
                      <strong>{form.category}</strong>
                      <span>Category</span>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button
                      onClick={() => handleViewResponses(form)}
                      className="btn btn-secondary btn-sm"
                    >
                      <FaEye /> View Responses
                    </button>
                    <button
                      onClick={() => handleCopyLink(form.publicUrl)}
                      className="btn btn-primary btn-sm"
                    >
                      <FaCopy /> Copy Link
                    </button>
                    <div className="share-buttons">
                      <button
                        onClick={() => shareOnWhatsApp(form.publicUrl, form.title)}
                        className="btn-icon btn-whatsapp"
                        title="Share on WhatsApp"
                      >
                        <FaWhatsapp />
                      </button>
                      <button
                        onClick={() => shareOnFacebook(form.publicUrl)}
                        className="btn-icon btn-facebook"
                        title="Share on Facebook"
                      >
                        <FaFacebook />
                      </button>
                      <button
                        onClick={() => shareOnTwitter(form.publicUrl, form.title)}
                        className="btn-icon btn-twitter"
                        title="Share on Twitter"
                      >
                        <FaTwitter />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteForm(form.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Form Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Feedback Form</h2>
            <form onSubmit={handleCreateForm}>
              <div className="input-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="E.g., Team Feedback, Video Comments"
                  required
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What kind of feedback are you looking for?"
                  rows="3"
                />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="WORK">Work</option>
                  <option value="CONTENT">Content</option>
                  <option value="EDUCATION">Education</option>
                  <option value="PERSONAL">Personal</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responses Modal */}
      {selectedForm && (
        <div className="modal-overlay" onClick={() => setSelectedForm(null)}>
          <div className="modal-content card responses-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Responses for "{selectedForm.title}"</h2>
            {responses.length === 0 ? (
              <div className="empty-responses">
                <p>No responses yet. Share your link to start receiving feedback!</p>
                <button onClick={() => handleCopyLink(selectedForm.publicUrl)} className="btn btn-primary">
                  <FaCopy /> Copy Link to Share
                </button>
              </div>
            ) : (
              <div className="responses-list">
                {responses.map((response) => (
                  <div key={response.id} className="response-item card">
                    <div className="response-header">
                      <span className="response-date">
                        {new Date(response.submittedAt).toLocaleString()}
                      </span>
                      {response.rating && (
                        <span className="response-rating">
                          {'⭐'.repeat(response.rating)}
                        </span>
                      )}
                    </div>
                    <p className="response-message">{response.message}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <button onClick={() => setSelectedForm(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Centered Message Modal */}
      {showMessage && (
        <div className="message-overlay" onClick={() => setShowMessage(false)}>
          <div className={`message-box ${messageType}`} onClick={(e) => e.stopPropagation()}>
            <div className="message-icon">
              {messageType === 'success' && <FaCheckCircle className="success-icon" />}
              {messageType === 'error' && <FaTimesCircle className="error-icon" />}
              {messageType === 'info' && <FaInfoCircle className="info-icon" />}
              {messageType === 'warning' && <FaExclamationTriangle className="warning-icon" />}
            </div>
            <h2>{messageTitle}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{messageText}</p>
            <button
              onClick={() => setShowMessage(false)}
              className="btn btn-primary"
            >
              {messageType === 'error' ? 'Try Again' : 'OK'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
