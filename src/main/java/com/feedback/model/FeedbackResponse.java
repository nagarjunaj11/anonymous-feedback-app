package com.feedback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedback_responses")
@EntityListeners(AuditingEntityListener.class)
public class FeedbackResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 5000)
    private String message;

    private Integer rating; // Optional 1-5 star rating

    @ManyToOne
    @JoinColumn(name = "feedback_form_id", nullable = false)
    private FeedbackForm feedbackForm;

    private String ipAddress; // For tracking (but keeping anonymous)
    private boolean isApproved = false;
    private boolean isRead = false;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime submittedAt;

    public FeedbackResponse() {
    }

    public FeedbackResponse(Long id, String message, Integer rating, FeedbackForm feedbackForm,
                           String ipAddress, boolean isApproved, boolean isRead, LocalDateTime submittedAt) {
        this.id = id;
        this.message = message;
        this.rating = rating;
        this.feedbackForm = feedbackForm;
        this.ipAddress = ipAddress;
        this.isApproved = isApproved;
        this.isRead = isRead;
        this.submittedAt = submittedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    @JsonIgnore
    public FeedbackForm getFeedbackForm() {
        return feedbackForm;
    }

    public void setFeedbackForm(FeedbackForm feedbackForm) {
        this.feedbackForm = feedbackForm;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    // Builder class
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String message;
        private Integer rating;
        private FeedbackForm feedbackForm;
        private String ipAddress;
        private boolean isApproved = false;
        private boolean isRead = false;
        private LocalDateTime submittedAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder rating(Integer rating) {
            this.rating = rating;
            return this;
        }

        public Builder feedbackForm(FeedbackForm feedbackForm) {
            this.feedbackForm = feedbackForm;
            return this;
        }

        public Builder ipAddress(String ipAddress) {
            this.ipAddress = ipAddress;
            return this;
        }

        public Builder isApproved(boolean isApproved) {
            this.isApproved = isApproved;
            return this;
        }

        public Builder isRead(boolean isRead) {
            this.isRead = isRead;
            return this;
        }

        public Builder submittedAt(LocalDateTime submittedAt) {
            this.submittedAt = submittedAt;
            return this;
        }

        public FeedbackResponse build() {
            return new FeedbackResponse(id, message, rating, feedbackForm, ipAddress,
                                       isApproved, isRead, submittedAt);
        }
    }
}
