package com.feedback.controller;

import com.feedback.dto.FeedbackResponseRequest;
import com.feedback.model.FeedbackForm;
import com.feedback.model.FeedbackResponse;
import com.feedback.service.FeedbackService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {

    private final FeedbackService feedbackService;

    public PublicController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/feedback/{uniqueLink}")
    public ResponseEntity<?> getFeedbackForm(@PathVariable String uniqueLink) {
        try {
            FeedbackForm form = feedbackService.getFeedbackFormByLink(uniqueLink);

            if (!form.isActive()) {
                return ResponseEntity.badRequest().body(Map.of("error", "This feedback form is no longer active"));
            }

            Map<String, Object> response = new HashMap<>();
            response.put("title", form.getTitle());
            response.put("description", form.getDescription());
            response.put("category", form.getCategory());
            response.put("creatorName", form.getUser().getFullName() != null ?
                    form.getUser().getFullName() : form.getUser().getUsername());
            response.put("upiId", form.getUser().getUpiId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Feedback form not found"));
        }
    }

    @PostMapping("/feedback/{uniqueLink}/submit")
    public ResponseEntity<?> submitFeedback(
            @PathVariable String uniqueLink,
            @Valid @RequestBody FeedbackResponseRequest request,
            HttpServletRequest httpRequest) {
        try {
            String ipAddress = getClientIpAddress(httpRequest);
            FeedbackResponse response = feedbackService.submitAnonymousFeedback(uniqueLink, request, ipAddress);

            return ResponseEntity.ok(Map.of(
                    "message", "Feedback submitted successfully! Thank you for sharing your thoughts.",
                    "responseId", response.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0];
        }
        return request.getRemoteAddr();
    }
}
