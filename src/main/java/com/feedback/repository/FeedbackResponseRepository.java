package com.feedback.repository;

import com.feedback.model.FeedbackForm;
import com.feedback.model.FeedbackResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackResponseRepository extends JpaRepository<FeedbackResponse, Long> {
    List<FeedbackResponse> findByFeedbackForm(FeedbackForm feedbackForm);
    List<FeedbackResponse> findByFeedbackFormAndIsApproved(FeedbackForm feedbackForm, boolean isApproved);
    long countByFeedbackForm(FeedbackForm feedbackForm);
}
