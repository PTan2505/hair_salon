package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Feedback;
import com.example.Hair_Salon_Project.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

}
