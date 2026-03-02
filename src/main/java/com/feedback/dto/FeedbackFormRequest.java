package com.feedback.dto;

import jakarta.validation.constraints.NotBlank;

public class FeedbackFormRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String category;
    private boolean allowMultipleResponses = true;
    private boolean requireApproval = false;

    public FeedbackFormRequest() {
    }

    public FeedbackFormRequest(String title, String description, String category,
                              boolean allowMultipleResponses, boolean requireApproval) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.allowMultipleResponses = allowMultipleResponses;
        this.requireApproval = requireApproval;
    }

    // Getters and Setters
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
}
