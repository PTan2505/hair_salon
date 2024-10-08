package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.BookingRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
@Service
public class CustomerService  {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthenticationService authenticationService;

    public Booking createNewBooking(BookingRequest bookingRequest){
            try {
                Booking booking = modelMapper.map(bookingRequest, Booking.class);
                Account accountRequest = authenticationService.getCurrentAccount();
                booking.setAccount(accountRequest);

                Booking newBooking =bookingRepository.save(booking);
                return newBooking;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
    }
}
