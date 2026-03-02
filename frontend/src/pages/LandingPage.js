import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaShareAlt, FaComments, FaStar, FaUsers, FaChartLine, FaPlay, FaTimes, FaHeart, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiPhonepe, SiGooglepay, SiPaytm } from 'react-icons/si';
import './LandingPage.css';

const LandingPage = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleWatchDemo = () => {
    setShowDemoModal(true);
  };

  const handleSupportUs = () => {
    setShowSupportModal(true);
  };

  const handleShareOnSocial = () => {
    const shareText = "Check out FeedbackHub - Collect anonymous feedback easily! 🚀";
    const shareUrl = window.location.origin;

    // Try native share API first (works on mobile)
    if (navigator.share) {
      navigator.share({
        title: 'FeedbackHub',
        text: shareText,
        url: shareUrl,
      }).catch((err) => console.log('Share cancelled'));
    } else {
      // Fallback to Twitter share
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <FaComments className="logo-icon" />
              <span>FeedbackHub</span>
            </div>
            <div className="nav-links">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title fade-in">
                Collect <span className="gradient-text">Anonymous Feedback</span> Like Never Before
              </h1>
              <p className="hero-subtitle fade-in">
                Create feedback forms, share your unique link, and receive honest anonymous messages from your audience. Perfect for managers, content creators, students, and professionals.
              </p>
              <div className="hero-buttons fade-in">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Start Free Today <FaShareAlt />
                </Link>
                <button onClick={handleWatchDemo} className="btn btn-secondary btn-lg">
                  <FaPlay /> Watch Demo
                </button>
              </div>
              <div className="hero-stats fade-in">
                <div className="stat">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Feedback Collected</div>
                </div>
                <div className="stat">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="hero-image fade-in">
              <div className="floating-card card-1">
                <FaComments className="card-icon" />
                <p>Anonymous feedback received!</p>
              </div>
              <div className="floating-card card-2">
                <FaStar className="card-icon" />
                <p>5-star rating received</p>
              </div>
              <div className="floating-card card-3">
                <FaUsers className="card-icon" />
                <p>100+ responses collected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose FeedbackHub?</h2>
            <p className="section-subtitle">Everything you need to collect and manage anonymous feedback</p>
          </div>
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon" style={{ background: 'var(--gradient-1)' }}>
                <FaLock />
              </div>
              <h3>100% Anonymous</h3>
              <p>Your respondents remain completely anonymous. We don't track or store any identifying information.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon" style={{ background: 'var(--gradient-2)' }}>
                <FaShareAlt />
              </div>
              <h3>Easy Sharing</h3>
              <p>Get a unique link for each feedback form. Share it anywhere - social media, email, or embed it on your website.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon" style={{ background: 'var(--gradient-3)' }}>
                <FaChartLine />
              </div>
              <h3>Real-time Insights</h3>
              <p>View and manage all feedback in one place. Get instant notifications when new feedback arrives.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <FaStar />
              </div>
              <h3>Rating System</h3>
              <p>Optional star ratings alongside text feedback help you quantify responses and track satisfaction.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                <FaUsers />
              </div>
              <h3>Multi-Purpose</h3>
              <p>Perfect for managers, YouTubers, teachers, professionals, and anyone seeking honest feedback.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
                <FaComments />
              </div>
              <h3>Unlimited Forms</h3>
              <p>Create as many feedback forms as you need. Organize feedback for different projects or purposes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Who Uses FeedbackHub?</h2>
            <p className="section-subtitle">Trusted by professionals across industries</p>
          </div>
          <div className="use-cases-grid">
            <div className="use-case-card card">
              <div className="use-case-emoji">👔</div>
              <h3>Managers</h3>
              <p>Get honest feedback from your team without fear of judgment. Improve team dynamics and workplace culture.</p>
            </div>
            <div className="use-case-card card">
              <div className="use-case-emoji">🎥</div>
              <h3>Content Creators</h3>
              <p>Receive genuine feedback from your audience. Understand what your viewers really think about your content.</p>
            </div>
            <div className="use-case-card card">
              <div className="use-case-emoji">🎓</div>
              <h3>Students & Teachers</h3>
              <p>Collect peer feedback, course evaluations, or project reviews in a safe, anonymous environment.</p>
            </div>
            <div className="use-case-card card">
              <div className="use-case-emoji">💼</div>
              <h3>Professionals</h3>
              <p>Gather career advice, mentorship feedback, or professional development insights anonymously.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content card">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">Join thousands of professionals collecting valuable feedback today</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <FaComments className="logo-icon" />
                <span>FeedbackHub</span>
              </div>
              <p>Empowering honest conversations through anonymous feedback.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <Link to="/register">Get Started</Link>
              <Link to="/login">Login</Link>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/register">Help Center</Link>
              <button onClick={handleSupportUs} className="footer-link-btn">
                <FaHeart /> Support Us
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FeedbackHub. Made with ❤️ for better communication.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="modal-overlay" onClick={() => setShowDemoModal(false)}>
          <div className="demo-modal card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDemoModal(false)}>
              <FaTimes />
            </button>
            <h2>🎥 How FeedbackHub Works</h2>
            <div className="demo-content">
              <div className="demo-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Create Your Account</h3>
                  <p>Sign up for free in seconds. No credit card required!</p>
                </div>
              </div>
              <div className="demo-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Create a Feedback Form</h3>
                  <p>Add a title, description, and category. Get your unique shareable link.</p>
                </div>
              </div>
              <div className="demo-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Share Your Link</h3>
                  <p>Share via WhatsApp, Facebook, Twitter, or any platform you prefer.</p>
                </div>
              </div>
              <div className="demo-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Receive Anonymous Feedback</h3>
                  <p>People submit feedback completely anonymously. View all responses in your dashboard.</p>
                </div>
              </div>
            </div>
            <div className="demo-actions">
              <Link to="/register" className="btn btn-primary btn-lg" onClick={() => setShowDemoModal(false)}>
                Start Free Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="modal-overlay" onClick={() => setShowSupportModal(false)}>
          <div className="support-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-white" onClick={() => setShowSupportModal(false)}>
              <FaTimes />
            </button>

            {/* Main Support Card */}
            <div className="support-main-card">
              <FaHeart className="support-hero-icon" />
              <h2 className="support-title">Support FeedbackHub</h2>
              <p className="support-subtitle">Help us keep this platform free and awesome for everyone!</p>
            </div>

            {/* Support Options Grid */}
            <div className="support-options-grid">
              {/* UPI Payment Card */}
              <div className="support-option-card">
                <div className="option-icon-wrapper">💰</div>
                <h3>Send a Donation</h3>
                <p>Support us via UPI payment</p>
                <div className="upi-display">
                  <div className="upi-id-box">
                    <span className="upi-label">UPI ID</span>
                    <span className="upi-value">nagasgs.493@ybl</span>
                  </div>
                  <div className="payment-methods-row">
                    <SiPhonepe className="payment-icon phonepe" title="PhonePe" />
                    <SiGooglepay className="payment-icon gpay" title="Google Pay" />
                    <SiPaytm className="payment-icon paytm" title="Paytm" />
                  </div>
                </div>
              </div>

              {/* Email Contact Card */}
              <div className="support-option-card">
                <div className="option-icon-wrapper">📧</div>
                <h3>Get in Touch</h3>
                <p>Questions or suggestions?</p>
                <a href="mailto:nagarjunaj938@gmail.com" className="support-action-btn">
                  <FaEnvelope /> Email Us
                </a>
              </div>

              {/* Share Card */}
              <div className="support-option-card">
                <div className="option-icon-wrapper">🌟</div>
                <h3>Spread the Word</h3>
                <p>Share with friends!</p>
                <button onClick={handleShareOnSocial} className="support-action-btn">
                  <FaShareAlt /> Share Now
                </button>
              </div>
            </div>

            {/* Thank You Footer */}
            <div className="support-thank-you">
              <p>Thank you for your support! ❤️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
