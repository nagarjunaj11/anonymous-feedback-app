package com.feedback.service;

import com.feedback.dto.FeedbackFormRequest;
import com.feedback.dto.FeedbackResponseRequest;
import com.feedback.model.FeedbackForm;
import com.feedback.model.FeedbackResponse;
import com.feedback.model.User;
import com.feedback.repository.FeedbackFormRepository;
import com.feedback.repository.FeedbackResponseRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackFormRepository feedbackFormRepository;
    private final FeedbackResponseRepository feedbackResponseRepository;

    public FeedbackService(FeedbackFormRepository feedbackFormRepository,
                          FeedbackResponseRepository feedbackResponseRepository) {
        this.feedbackFormRepository = feedbackFormRepository;
        this.feedbackResponseRepository = feedbackResponseRepository;
    }

    @Value("${app.base-url}")
    private String baseUrl;

    @Transactional
    public FeedbackForm createFeedbackForm(User user, FeedbackFormRequest request) {
        FeedbackForm form = FeedbackForm.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .allowMultipleResponses(request.isAllowMultipleResponses())
                .requireApproval(request.isRequireApproval())
                .user(user)
                .isActive(true)
                .build();

        return feedbackFormRepository.save(form);
    }

    public FeedbackForm getFeedbackFormByLink(String uniqueLink) {
        return feedbackFormRepository.findByUniqueLink(uniqueLink)
                .orElseThrow(() -> new RuntimeException("Feedback form not found"));
    }

    public List<FeedbackForm> getUserFeedbackForms(User user) {
        return feedbackFormRepository.findByUser(user);
    }

    @Transactional
    public FeedbackResponse submitAnonymousFeedback(String uniqueLink, FeedbackResponseRequest request, String ipAddress) {
        FeedbackForm form = getFeedbackFormByLink(uniqueLink);

        if (!form.isActive()) {
            throw new RuntimeException("This feedback form is no longer accepting responses");
        }

        FeedbackResponse response = FeedbackResponse.builder()
                .message(request.getMessage())
                .rating(request.getRating())
                .feedbackForm(form)
                .ipAddress(ipAddress)
                .isApproved(!form.isRequireApproval())
                .isRead(false)
                .build();

        return feedbackResponseRepository.save(response);
    }

    public List<FeedbackResponse> getFeedbackResponses(Long formId) {
        FeedbackForm form = feedbackFormRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Feedback form not found"));
        return feedbackResponseRepository.findByFeedbackForm(form);
    }

    @Transactional
    public FeedbackResponse markAsRead(Long responseId) {
        FeedbackResponse response = feedbackResponseRepository.findById(responseId)
                .orElseThrow(() -> new RuntimeException("Response not found"));
        response.setRead(true);
        return feedbackResponseRepository.save(response);
    }

    @Transactional
    public void deleteFeedbackForm(Long formId, User user) {
        FeedbackForm form = feedbackFormRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Feedback form not found"));

        if (!form.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        feedbackFormRepository.delete(form);
    }
}
