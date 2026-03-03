import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaComments, FaStar, FaPaperPlane, FaHeart, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { SiPhonepe, SiGooglepay, SiPaytm } from 'react-icons/si';
import { publicAPI } from '../services/api';
import './SubmitFeedback.css';

const SubmitFeedback = () => {
  const { uniqueLink } = useParams();
  const [formInfo, setFormInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    message: '',
    rating: 0,
  });

  // Centered message state
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');

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

  const loadFormInfo = useCallback(async () => {
    try {
      const response = await publicAPI.getFeedbackForm(uniqueLink);
      setFormInfo(response.data);
    } catch (error) {
      showCenteredMessage('error', 'Error!', 'Feedback form not found');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueLink]);

  useEffect(() => {
    loadFormInfo();
  }, [loadFormInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedbackData.message.length < 10) {
      showCenteredMessage('warning', 'Too Short!', 'Please write at least 10 characters to share your feedback.');
      return;
    }

    try {
      await publicAPI.submitFeedback(uniqueLink, feedbackData);
      setSubmitted(true);
      showCenteredMessage('success', 'Feedback Submitted!', 'Your anonymous feedback has been submitted successfully! Thank you for sharing your thoughts.', true, 3000);
    } catch (error) {
      showCenteredMessage('error', 'Submission Failed!', 'Failed to submit feedback. Please try again.');
    }
  };

  const handleRatingClick = (rating) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const openUPIPayment = () => {
    if (formInfo.upiId) {
      const upiUrl = `upi://pay?pa=${formInfo.upiId}&pn=${formInfo.creatorName}&cu=INR`;
      window.location.href = upiUrl;
      showCenteredMessage('info', 'Opening Payment App...', 'Please complete the payment in your UPI app.', true, 2000);
    } else {
      showCenteredMessage('warning', 'UPI Not Configured', 'The creator has not configured their UPI ID for donations.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!formInfo) {
    return (
      <div className="submit-feedback-page">
        <div className="container">
          <div className="error-card card">
            <h2>Feedback Form Not Found</h2>
            <p>The feedback form you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="submit-feedback-page success-page">
        <div className="container">
          <div className="success-card card">
            <div className="success-icon">
              <FaComments />
            </div>
            <h2>Thank You! 🎉</h2>
            <p>Your anonymous feedback has been submitted successfully.</p>
            <p className="success-subtitle">
              {formInfo.creatorName} will receive your message and appreciate your honest thoughts.
            </p>

            {formInfo.upiId && (
              <div className="donation-section">
                <div className="donation-header">
                  <FaHeart className="heart-icon" />
                  <h3>Support {formInfo.creatorName}</h3>
                </div>
                <p>If you found this helpful, consider showing your support!</p>
                <button onClick={openUPIPayment} className="btn btn-success btn-lg">
                  <FaHeart /> Donate via UPI
                </button>
                <div className="upi-id">UPI ID: {formInfo.upiId}</div>
                <div className="payment-methods">
                  <SiPhonepe className="payment-icon" />
                  <SiGooglepay className="payment-icon" />
                  <SiPaytm className="payment-icon" />
                </div>
              </div>
            )}

            <div className="action-buttons">
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                Submit Another Feedback
              </button>
              <Link to="/" className="btn btn-primary">
                Create Your Own
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-feedback-page">
      <div className="container">
        <div className="feedback-card card">
          <div className="feedback-header">
            <div className="logo">
              <FaComments className="logo-icon" />
              <span>FeedbackHub</span>
            </div>
            <div className="creator-info">
              <div className="creator-avatar">
                {formInfo.creatorName?.charAt(0).toUpperCase()}
              </div>
              <div className="creator-details">
                <h2>{formInfo.title}</h2>
                <p className="creator-name">By {formInfo.creatorName}</p>
              </div>
            </div>
            {formInfo.description && (
              <p className="form-description">{formInfo.description}</p>
            )}
            <div className="anonymous-badge">
              <span>🔒 Your response is 100% anonymous</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="rating-section">
              <label>Rate your experience (optional)</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${feedbackData.rating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Your Anonymous Message *</label>
              <textarea
                value={feedbackData.message}
                onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                placeholder="Share your honest thoughts, feedback, or suggestions here... Remember, this is completely anonymous!"
                rows="8"
                required
                minLength={10}
              />
              <div className="char-count">
                {feedbackData.message.length} / 5000 characters
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              <FaPaperPlane /> Send Anonymous Feedback
            </button>
          </form>

          <div className="feedback-footer">
            <p>
              Your identity is never revealed. The creator will only see your message.
            </p>
          </div>
        </div>

        {/* Create Your Own CTA */}
        <div className="cta-card card">
          <h3>Want to receive anonymous feedback too?</h3>
          <p>Create your own feedback form in minutes and start collecting honest insights!</p>
          <Link to="/register" className="btn btn-primary">
            Create Your Free Account
          </Link>
        </div>
      </div>

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
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitFeedback;
