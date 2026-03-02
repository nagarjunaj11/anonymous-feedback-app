package com.feedback.dto;

public class UpdateProfileRequest {
    private String email;
    private String upiId;
    private String currentPassword;
    private String newPassword;

    public UpdateProfileRequest() {
    }

    public UpdateProfileRequest(String email, String upiId, String currentPassword, String newPassword) {
        this.email = email;
        this.upiId = upiId;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
