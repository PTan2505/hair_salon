package com.example.Hair_Salon_Project.Api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Model.BookingResponse;
import com.example.Hair_Salon_Project.Model.BookingStatusRequest;
import com.example.Hair_Salon_Project.Service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
@PreAuthorize("hasRole('STYLIST')")
public class AdminBookingAPI {
    @Autowired
    private BookingService bookingService;

    @GetMapping()
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<Booking> bookings = bookingService.getListBookingsAdmin();
        return ResponseEntity.ok(bookingService.generateBookingResponseList(bookings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingDetails(@PathVariable Long id) {
        Booking booking = bookingService.getBookingDetailsAdmin(id);
        return ResponseEntity.ok(bookingService.generateBookingResponse(booking));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BookingResponse> partialUpdateBooking(@PathVariable Long id,
            @RequestBody BookingStatusRequest bookingStatusRequest) {
        Booking updatedBooking = bookingService.partialUpdateBooking(id, bookingStatusRequest);
        return ResponseEntity.ok(bookingService.generateBookingResponse(updatedBooking));
    }
}
