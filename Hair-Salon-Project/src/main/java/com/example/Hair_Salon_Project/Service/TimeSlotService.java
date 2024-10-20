package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.TimeSlot;
import com.example.Hair_Salon_Project.Repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public void saveTimeSlot(TimeSlot timeSlot) {
        Optional<TimeSlot> existingTimeSlot = timeSlotRepository.findByStartTimeAndEndTime(timeSlot.getStartTime(),
                timeSlot.getEndTime());
        if (existingTimeSlot.isEmpty()) {
            timeSlotRepository.save(timeSlot);
        }
    }
}
