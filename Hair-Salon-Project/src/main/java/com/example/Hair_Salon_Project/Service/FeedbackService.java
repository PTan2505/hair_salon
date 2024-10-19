package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Feedback;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Repository.FeedbackRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private StaffRepository staffRepository;

    public List<Feedback> getFeedbacksByStaff(long staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        return feedbackRepository.findAll();
    }

    // Additional methods for managing feedback can be added here
}
