package com.feedback.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "feedback_forms")
@EntityListeners(AuditingEntityListener.class)
public class FeedbackForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String uniqueLink; // UUID-based unique identifier

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String category; // WORK, CONTENT, EDUCATION, PERSONAL

    private boolean isActive = true;
    private boolean allowMultipleResponses = true;
    private boolean requireApproval = false;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "feedbackForm", cascade = CascadeType.ALL)
    private List<FeedbackResponse> responses = new ArrayList<>();

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public FeedbackForm() {
    }

    public FeedbackForm(Long id, String uniqueLink, String title, String description, String category,
                       boolean isActive, boolean allowMultipleResponses, boolean requireApproval,
                       User user, List<FeedbackResponse> responses, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.uniqueLink = uniqueLink;
        this.title = title;
        this.description = description;
        this.category = category;
        this.isActive = isActive;
        this.allowMultipleResponses = allowMultipleResponses;
        this.requireApproval = requireApproval;
        this.user = user;
        this.responses = responses;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    public void generateUniqueLink() {
        if (this.uniqueLink == null) {
            this.uniqueLink = UUID.randomUUID().toString().substring(0, 8);
        }
    }

    public String getPublicUrl(String baseUrl) {
        return baseUrl + "/feedback/" + uniqueLink;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUniqueLink() {
        return uniqueLink;
    }

    public void setUniqueLink(String uniqueLink) {
        this.uniqueLink = uniqueLink;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isAllowMultipleResponses() {
        return allowMultipleResponses;
    }

    public void setAllowMultipleResponses(boolean allowMultipleResponses) {
        this.allowMultipleResponses = allowMultipleResponses;
    }

    public boolean isRequireApproval() {
        return requireApproval;
    }

    public void setRequireApproval(boolean requireApproval) {
        this.requireApproval = requireApproval;
    }
    @JsonIgnore

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @JsonIgnore
    public List<FeedbackResponse> getResponses() {
        return responses;
    }

    public void setResponses(List<FeedbackResponse> responses) {
        this.responses = responses;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Builder class
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String uniqueLink;
        private String title;
        private String description;
        private String category;
        private boolean isActive = true;
        private boolean allowMultipleResponses = true;
        private boolean requireApproval = false;
        private User user;
        private List<FeedbackResponse> responses = new ArrayList<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder uniqueLink(String uniqueLink) {
            this.uniqueLink = uniqueLink;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Builder isActive(boolean isActive) {
            this.isActive = isActive;
            return this;
        }

        public Builder allowMultipleResponses(boolean allowMultipleResponses) {
            this.allowMultipleResponses = allowMultipleResponses;
            return this;
        }

        public Builder requireApproval(boolean requireApproval) {
            this.requireApproval = requireApproval;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Builder responses(List<FeedbackResponse> responses) {
            this.responses = responses;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public FeedbackForm build() {
            return new FeedbackForm(id, uniqueLink, title, description, category, isActive,
                                   allowMultipleResponses, requireApproval, user, responses,
                                   createdAt, updatedAt);
        }
    }
}
