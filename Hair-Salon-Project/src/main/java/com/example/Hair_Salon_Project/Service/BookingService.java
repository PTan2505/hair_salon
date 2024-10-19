// package com.example.Hair_Salon_Project.Service;

// import com.example.Hair_Salon_Project.Entity.Booking;
// import com.example.Hair_Salon_Project.Entity.Staff;
// import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;
// import com.example.Hair_Salon_Project.Repository.BookingRepository;
// import com.example.Hair_Salon_Project.Repository.StaffRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class BookingService {

// @Autowired
// private BookingRepository bookingRepository;

// @Autowired
// private StaffRepository staffRepository;

// public List<Booking> getAllBookings() {
// return bookingRepository.findAll();
// }

// public List<Booking> getBookingsByStaff(long staffId) {
// Staff staff = staffRepository.findById(staffId)
// .orElseThrow(() -> new RuntimeException("Staff not found"));
// return bookingRepository.findByStaff(staff);
// }

// public Booking confirmBooking(long bookingId) {
// Booking booking = bookingRepository.findById(bookingId)
// .orElseThrow(() -> new RuntimeException("Booking not found"));
// booking.setStatus(BookingStatus.CONFIRMED);
// return bookingRepository.save(booking);
// }

// public Booking cancelBooking(long bookingId) {
// Booking booking = bookingRepository.findById(bookingId)
// .orElseThrow(() -> new RuntimeException("Booking not found"));
// booking.setStatus(BookingStatus.CANCELLED);
// return bookingRepository.save(booking);
// }
// }
