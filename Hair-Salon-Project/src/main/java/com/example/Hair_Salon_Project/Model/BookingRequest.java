package com.example.Hair_Salon_Project.Model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class BookingRequest {
    private String note;

    private Long staffId;

    @NotBlank(message = "Product is required")
    private Long productId;

    @NotBlank(message = "Timeslot is required")
    private Long timeSlotId;

    @NotBlank(message = "Booking date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private LocalDate bookingDate;
}
