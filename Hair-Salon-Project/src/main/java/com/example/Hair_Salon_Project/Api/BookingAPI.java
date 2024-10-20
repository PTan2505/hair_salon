package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Model.BookingResponse;
import com.example.Hair_Salon_Project.Service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/bookings")
public class BookingAPI {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest) {
        BookingResponse bookingResponse = bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(bookingResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking has been cancelled.");
    }

    @GetMapping("/bookings")
    public ArrayList<BookingResponse> getListBookings() {
        return bookingService.getListBookings();
    }

    @GetMapping("/bookings/{id}")
    public BookingResponse getBookingDetails(@PathVariable Long id) {
        return bookingService.getBookingDetails(id);
    }
}
