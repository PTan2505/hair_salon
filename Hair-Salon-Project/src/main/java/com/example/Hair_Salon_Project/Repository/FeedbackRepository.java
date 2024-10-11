package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Feedback;
import com.example.Hair_Salon_Project.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Product findFeedbackById(Long id);
}
