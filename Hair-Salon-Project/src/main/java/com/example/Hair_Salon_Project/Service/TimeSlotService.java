package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.TimeSlot;
import com.example.Hair_Salon_Project.Repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public void generateDefaultTimeSlots() {
        LocalTime startTime = LocalTime.of(9, 0); // Start at 9 AM
        LocalTime endTime = LocalTime.of(21, 0); // End at 9 PM
        int interval = 30; // Interval in minutes

        List<TimeSlot> timeSlots = new ArrayList<>();

        for (LocalTime time = startTime; time.isBefore(endTime); time = time.plusMinutes(interval)) {
            TimeSlot slot = new TimeSlot();
            slot.setStartTime(time);
            slot.setEndTime(time.plusMinutes(interval)); // Each slot lasts 30 minutes
            timeSlots.add(slot);
        }

        // Save the time slots to the database
        timeSlotRepository.saveAll(timeSlots);
    }

    public List<TimeSlot> getAllTimeSlots() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllTimeSlots'");
    }
}
