package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Feedback;
import com.example.Hair_Salon_Project.Model.FeedbackRequest;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class CustomerFeedbackApi {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private AccountRepository accountRepository;

    // Tạo feedback mới cho customer
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@AuthenticationPrincipal Account account,
                                                   @RequestBody FeedbackRequest feedbackRequest) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
        feedback.setRating(feedbackRequest.getRating());
        feedback.setAccount(account); // Liên kết feedback với account của customer

        feedbackRepository.save(feedback);
        return ResponseEntity.ok(feedback);
    }

    // Xem feedback của chính customer
    @GetMapping
    public ResponseEntity<List<Feedback>> getMyFeedbacks(@AuthenticationPrincipal Account account) {
        List<Feedback> feedbacks = feedbackRepository.findByAccountId(account.getId());
        return ResponseEntity.ok(feedbacks);
    }
}
