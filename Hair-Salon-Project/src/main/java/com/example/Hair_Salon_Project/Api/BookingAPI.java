package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Model.BookingResponse;
import com.example.Hair_Salon_Project.Service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingAPI {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest) {
        Booking booking = bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(bookingService.generateBookingResponse(booking));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking has been cancelled.");
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getListBookings() {
        List<Booking> bookings = bookingService.getListBookings();
        List<BookingResponse> bookingResponses = bookings.stream()
                .map(bookingService::generateBookingResponse)
                .collect(Collectors.toCollection(ArrayList::new));
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingDetails(@PathVariable Long id) {
        Booking booking = bookingService.getBookingDetails(id);
        return ResponseEntity.ok(bookingService.generateBookingResponse(booking));
    }
}
