package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Bill;
import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Entity.Feedback;
import com.example.Hair_Salon_Project.Entity.Salary;
import com.example.Hair_Salon_Project.Service.BillService;
import com.example.Hair_Salon_Project.Service.BookingService;
import com.example.Hair_Salon_Project.Service.FeedbackService;
import com.example.Hair_Salon_Project.Service.SalaryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name="api") // để sử dụng token trên swagger
public class StaffAPI {

    @Autowired
    private BillService billService;

    // Create a new bill
    @PostMapping("/bills") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<Bill> createBill(@Valid @RequestBody Bill bill, @RequestParam long staffId) {
        Bill createdBill = billService.createBill(bill, staffId);
        return ResponseEntity.ok(createdBill);
    }

    // Update an existing bill
    @PutMapping("/bills/{id}") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<Bill> updateBill(@PathVariable Long id, @Valid @RequestBody Bill billDetails) {
        Bill updatedBill = billService.updateBill(id, billDetails);
        return ResponseEntity.ok(updatedBill);
    }

    // Get all bills
    @GetMapping("/bills") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<List<Bill>> getAllBills() {
        List<Bill> bills = billService.getAllBills();
        return ResponseEntity.ok(bills);
    }

    // Get bills by staff
    @GetMapping("/staff/{staffId}/bills") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<List<Bill>> getBillsByStaff(@PathVariable Long staffId) {
        List<Bill> bills = billService.getBillsByStaff(staffId);
        return ResponseEntity.ok(bills);
    }

    @Autowired
    private BookingService bookingService;

    // Get all bookings (admin functionality)
    @GetMapping("/bookings") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    // Get bookings by staff
    @GetMapping("/staff/{staffId}/bookings") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<List<Booking>> getBookingsByStaff(@PathVariable Long staffId) {
        List<Booking> bookings = bookingService.getBookingsByStaff(staffId);
        return ResponseEntity.ok(bookings);
    }

    // Approve a booking
    @PostMapping("/bookings/{id}/approve") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<Booking> approveBooking(@PathVariable Long id) {
        Booking approvedBooking = bookingService.approveBooking(id);
        return ResponseEntity.ok(approvedBooking);
    }

    // Reject a booking
    @PostMapping("/bookings/{id}/reject") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<Booking> rejectBooking(@PathVariable Long id) {
        Booking rejectedBooking = bookingService.rejectBooking(id);
        return ResponseEntity.ok(rejectedBooking);
    }

    @Autowired
    private SalaryService salaryService;

    // Get salaries by staff
    @GetMapping("/staff/{staffId}/salaries") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<List<Salary>> getSalariesByStaff(@PathVariable Long staffId) {
        List<Salary> salaries = salaryService.getSalariesByStaff(staffId);
        return ResponseEntity.ok(salaries);
    }

    @Autowired
    private FeedbackService feedbackService;

    // Get feedbacks by staff
    @GetMapping("/staff/{staffId}/feedbacks") // Thay đổi đường dẫn
    @PreAuthorize("hasAuthority('STAFF')")

    public ResponseEntity<List<Feedback>> getFeedbacksByStaff(@PathVariable Long staffId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByStaff(staffId);
        return ResponseEntity.ok(feedbacks);
    }


}
