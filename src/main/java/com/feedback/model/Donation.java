package com.feedback.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@EntityListeners(AuditingEntityListener.class)
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal amount;
    private String transactionId;
    private String donorName; // Optional
    private String donorEmail; // Optional

    @Column(length = 500)
    private String message;

    private String status; // PENDING, COMPLETED, FAILED

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Donation() {
    }

    public Donation(Long id, User user, BigDecimal amount, String transactionId, String donorName,
                   String donorEmail, String message, String status, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.amount = amount;
        this.transactionId = transactionId;
        this.donorName = donorName;
        this.donorEmail = donorEmail;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Builder class
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private User user;
        private BigDecimal amount;
        private String transactionId;
        private String donorName;
        private String donorEmail;
        private String message;
        private String status;
        private LocalDateTime createdAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Builder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public Builder transactionId(String transactionId) {
            this.transactionId = transactionId;
            return this;
        }

        public Builder donorName(String donorName) {
            this.donorName = donorName;
            return this;
        }

        public Builder donorEmail(String donorEmail) {
            this.donorEmail = donorEmail;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Donation build() {
            return new Donation(id, user, amount, transactionId, donorName, donorEmail,
                               message, status, createdAt);
        }
    }
}
