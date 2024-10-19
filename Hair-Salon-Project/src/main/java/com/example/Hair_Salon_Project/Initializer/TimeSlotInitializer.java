package com.example.Hair_Salon_Project.Initializer;

import com.example.Hair_Salon_Project.Entity.TimeSlot;
import com.example.Hair_Salon_Project.Service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class TimeSlotInitializer implements CommandLineRunner {

    @Autowired
    private TimeSlotService timeSlotService;

    @Override
    public void run(String... args) throws Exception {
        LocalTime startTime = LocalTime.of(9, 0);
        LocalTime endTime = LocalTime.of(21, 0);

        int slotDurationMinutes = 30;
        long id = 1;

        for (LocalTime time = startTime; time.isBefore(endTime); time = time.plusMinutes(slotDurationMinutes)) {
            TimeSlot timeSlot = new TimeSlot();
            timeSlot.setId(id);
            timeSlot.setStartTime(time);
            timeSlot.setEndTime(time.plusMinutes(slotDurationMinutes));

            timeSlotService.saveTimeSlot(timeSlot);
            id++;
        }
    }
}