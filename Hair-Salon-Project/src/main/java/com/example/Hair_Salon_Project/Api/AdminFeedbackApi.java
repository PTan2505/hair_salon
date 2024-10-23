package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Feedback;
import com.example.Hair_Salon_Project.Model.FeedbackRequest;
import com.example.Hair_Salon_Project.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/feedbacks")
public class AdminFeedbackApi {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Xem tất cả feedback trong hệ thống
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return ResponseEntity.ok(feedbacks);
    }

    // Xóa feedback theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        feedbackRepository.deleteById(id);
        return ResponseEntity.ok("Feedback has been deleted");
    }

    // Chỉnh sửa feedback (ví dụ: chỉ chỉnh sửa rating và feedbackText)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFeedback(@PathVariable Long id, @RequestBody FeedbackRequest feedbackRequest) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
        feedback.setRating(feedbackRequest.getRating());
        feedbackRepository.save(feedback);

        return ResponseEntity.ok(feedback);
    }
}
