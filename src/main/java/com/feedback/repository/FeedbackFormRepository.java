package com.feedback.repository;

import com.feedback.model.FeedbackForm;
import com.feedback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackFormRepository extends JpaRepository<FeedbackForm, Long> {
    Optional<FeedbackForm> findByUniqueLink(String uniqueLink);
    List<FeedbackForm> findByUser(User user);
    List<FeedbackForm> findByUserAndIsActive(User user, boolean isActive);
}
