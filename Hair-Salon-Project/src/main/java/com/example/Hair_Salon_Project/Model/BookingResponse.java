package com.example.Hair_Salon_Project.Model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingResponse {
    private String note;
    private Long staffId;
    private Long productId;
    private Long timeSlotId;
    private LocalDate bookingDate;
}