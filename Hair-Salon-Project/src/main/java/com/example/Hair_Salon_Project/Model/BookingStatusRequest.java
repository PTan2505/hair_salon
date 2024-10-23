package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;

import lombok.Data;

@Data
public class BookingStatusRequest {
    private String status;

    public BookingStatus getBookingEnum() {
        if (status == null) {
            throw new IllegalArgumentException("Status cannot be null");
        }
        return BookingStatus.valueOf(status.toUpperCase());
    }
}
