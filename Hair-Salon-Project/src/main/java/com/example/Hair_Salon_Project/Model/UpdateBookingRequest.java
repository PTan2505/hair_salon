package com.example.Hair_Salon_Project.Model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class UpdateBookingRequest {
    private String note;

    private Long staffId;

    private Long productId;

    private Long timeSlotId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private LocalDate bookingDate;
}
