package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    // Additional query methods can be defined here if needed
}
