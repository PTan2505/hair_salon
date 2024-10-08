package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Service.CustomerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@SecurityRequirement(name="api")// để sử dụng token tren swagger
public class CustomerAPI {

    @Autowired
    CustomerService customerService;

    @PostMapping("/bookings")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity createBooking(@Valid @RequestBody BookingRequest bookingRequest){
        Booking newBooking = customerService.createNewBooking(bookingRequest);
        return ResponseEntity.ok(newBooking);
    }

}
