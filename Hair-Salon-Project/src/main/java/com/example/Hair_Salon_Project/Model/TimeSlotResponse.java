package com.example.Hair_Salon_Project.Model;

import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimeSlotResponse {
    private Long id;
    private LocalTime startTime;
    private LocalTime endTime;

}
