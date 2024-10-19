// package com.example.Hair_Salon_Project.Api;

// import com.example.Hair_Salon_Project.Entity.Account;
// import com.example.Hair_Salon_Project.Entity.Booking;
// import com.example.Hair_Salon_Project.Entity.Feedback;
// import com.example.Hair_Salon_Project.Model.AccountUpdateRequest;
// import com.example.Hair_Salon_Project.Model.BookingRequest;
// import com.example.Hair_Salon_Project.Model.BookingStatus;
// import com.example.Hair_Salon_Project.Model.FeedbackRequest;
// import com.example.Hair_Salon_Project.Service.CustomerService;
// import io.swagger.v3.oas.annotations.security.SecurityRequirement;
// import jakarta.validation.Valid;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/customer/")
// @SecurityRequirement(name="api")// để sử dụng token tren swagger
// public class CustomerAPI {

// @Autowired
// CustomerService customerService;

// @PostMapping("/booking")
// @PreAuthorize("hasAuthority('CUSTOMER')")
// public ResponseEntity createBooking(@Valid @RequestBody BookingRequest
// bookingRequest){
// Booking newBooking = customerService.createNewBooking(bookingRequest);
// return ResponseEntity.ok(newBooking);
// }

// @GetMapping("/booking/status")
// @PreAuthorize("hasAuthority('CUSTOMER')")
// public ResponseEntity getBookingStatus() {
// List<BookingStatus> bookingStatusList = customerService.getAllBooking();
// return ResponseEntity.ok(bookingStatusList);
// }

// @PostMapping("/feedback")
// @PreAuthorize("hasAuthority('CUSTOMER')")
// public ResponseEntity createFeedback(@Valid @RequestBody FeedbackRequest
// feedbackRequest){
// Feedback feedback = customerService.createFeedback(feedbackRequest);
// return ResponseEntity.ok(feedback);
// }

// @PutMapping("/account")
// @PreAuthorize("hasAuthority('CUSTOMER')")
// public ResponseEntity updateAccount(@Valid @RequestBody AccountUpdateRequest
// accountUpdateRequest) {
// Account updatedAccount = customerService.updateAccount(accountUpdateRequest);
// return ResponseEntity.ok(updatedAccount);
// }

// }
