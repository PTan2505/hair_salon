package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;

import lombok.Data;

@Data
public class BookingStatusRequest {
    private String status;

    public BookingStatus getBookingEnum() {
        return BookingStatus.valueOf(status.toUpperCase());
    }
}
