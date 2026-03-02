package com.feedback.controller;

import com.feedback.dto.FeedbackFormRequest;
import com.feedback.model.FeedbackForm;
import com.feedback.model.FeedbackResponse;
import com.feedback.model.User;
import com.feedback.service.FeedbackService;
import com.feedback.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final UserService userService;

    public FeedbackController(FeedbackService feedbackService, UserService userService) {
        this.feedbackService = feedbackService;
        this.userService = userService;
    }

    @Value("${app.base-url}")
    private String baseUrl;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @PostMapping("/create")
    public ResponseEntity<?> createFeedbackForm(
            @Valid @RequestBody FeedbackFormRequest request,
            Authentication authentication) {
        try {
            User user = userService.getUserByUsername(authentication.getName());
            FeedbackForm form = feedbackService.createFeedbackForm(user, request);

            Map<String, Object> response = new HashMap<>();
            response.put("id", form.getId());
            response.put("title", form.getTitle());
            response.put("uniqueLink", form.getUniqueLink());
            response.put("publicUrl", frontendUrl + "/f/" + form.getUniqueLink());
            response.put("shareUrl", frontendUrl + "/f/" + form.getUniqueLink());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/my-forms")
    public ResponseEntity<?> getMyFeedbackForms(Authentication authentication) {
        try {
            User user = userService.getUserByUsername(authentication.getName());
            List<FeedbackForm> forms = feedbackService.getUserFeedbackForms(user);

            List<Map<String, Object>> formsList = forms.stream().map(form -> {
                Map<String, Object> formMap = new HashMap<>();
                formMap.put("id", form.getId());
                formMap.put("title", form.getTitle());
                formMap.put("description", form.getDescription());
                formMap.put("uniqueLink", form.getUniqueLink());
                formMap.put("publicUrl", frontendUrl + "/f/" + form.getUniqueLink());
                formMap.put("category", form.getCategory());
                formMap.put("isActive", form.isActive());
                formMap.put("responseCount", form.getResponses().size());
                formMap.put("createdAt", form.getCreatedAt());
                return formMap;
            }).toList();

            return ResponseEntity.ok(formsList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{formId}/responses")
    public ResponseEntity<?> getFeedbackResponses(
            @PathVariable Long formId,
            Authentication authentication) {
        try {
            List<FeedbackResponse> responses = feedbackService.getFeedbackResponses(formId);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/response/{responseId}/read")
    public ResponseEntity<?> markAsRead(
            @PathVariable Long responseId,
            Authentication authentication) {
        try {
            FeedbackResponse response = feedbackService.markAsRead(responseId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{formId}")
    public ResponseEntity<?> deleteFeedbackForm(
            @PathVariable Long formId,
            Authentication authentication) {
        try {
            User user = userService.getUserByUsername(authentication.getName());
            feedbackService.deleteFeedbackForm(formId, user);
            return ResponseEntity.ok(Map.of("message", "Feedback form deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
