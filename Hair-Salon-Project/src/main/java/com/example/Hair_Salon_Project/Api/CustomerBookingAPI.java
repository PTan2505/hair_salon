package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Entity.TimeSlot;
import com.example.Hair_Salon_Project.Model.AvailableStaffResponse;
import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Model.BookingResponse;
import com.example.Hair_Salon_Project.Model.BookingStatusRequest;
import com.example.Hair_Salon_Project.Model.TimeSlotResponse;
import com.example.Hair_Salon_Project.Service.BookingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class CustomerBookingAPI {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest) {
        Booking booking = bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(bookingService.generateBookingResponse(booking));
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getListBookings() {
        List<Booking> bookings = bookingService.getListBookings();
        return ResponseEntity.ok(bookingService.generateBookingResponseList(bookings));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BookingResponse> partialUpdateBooking(@PathVariable Long id,
            @RequestBody BookingStatusRequest bookingStatusRequest) {
        Booking updatedBooking = bookingService.partialUpdateBooking(id, bookingStatusRequest);
        return ResponseEntity.ok(bookingService.generateBookingResponse(updatedBooking));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingDetails(@PathVariable Long id) {
        Booking booking = bookingService.getBookingDetails(id);
        return ResponseEntity.ok(bookingService.generateBookingResponse(booking));
    }

    @GetMapping("/available-staffs")
    public ResponseEntity<List<AvailableStaffResponse>> getAvailableStaff(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate bookingDate,
            @RequestParam Long productId,
            @RequestParam Long timeSlotId) {
        List<Staff> availableStaff = bookingService.getAvailableStaff(bookingDate, productId, timeSlotId);
        return ResponseEntity.ok(availableStaff.stream()
                .map(staff -> {
                    AvailableStaffResponse result = modelMapper.map(staff, AvailableStaffResponse.class);
                    Account account = staff.getAccount();
                    result.setFirstName(account.getFirstName());
                    result.setLastName(account.getLastName());
                    result.setEmail(account.getEmail());
                    result.setGender(account.getGender().toString());
                    result.setBirthday(account.getBirthday());
                    return result;
                })
                .collect(Collectors.toList()));
    }

    @GetMapping("/available-timeslots")
    public ResponseEntity<List<TimeSlotResponse>> getAvailableTimeSlots(
            @RequestParam Long staffId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate bookingDate,
            @RequestParam Long productId) {

        List<TimeSlot> availableTimeSlots = bookingService.getAvailableTimeSlots(staffId, bookingDate, productId);

        return ResponseEntity.ok(availableTimeSlots.stream()
                .map(timeSlot -> modelMapper.map(timeSlot, TimeSlotResponse.class))
                .collect(Collectors.toList()));

    }
}
