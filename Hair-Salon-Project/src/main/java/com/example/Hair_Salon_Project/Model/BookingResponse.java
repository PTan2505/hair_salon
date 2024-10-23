package com.example.Hair_Salon_Project.Model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class BookingResponse {
    private Long id;
    private String note;
    private String staffName;
    private ProductCloneResponse product;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate bookingDate;
}