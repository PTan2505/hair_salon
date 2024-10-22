package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Booking;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Entity.TimeSlot;
import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByAccount(Account account);

    List<Booking> findByAccountIdAndBookingDate(Long accountId, LocalDate bookingDate);

    List<Booking> findByStaffIdAndBookingDate(Long staffId, LocalDate bookingDate);

    boolean existsByTimeSlotsAndBookingDate(TimeSlot timeSlot, LocalDate bookingDate);

    boolean existsByTimeSlotsAndBookingDateAndStaffAndStatusNot(TimeSlot timeSlot, LocalDate bookingDate, Staff staff,
            BookingStatus status);

    int countByStaffAndBookingDateAndStatusNot(Staff staff, LocalDate bookingDate, BookingStatus status);

    List<Booking> findByStaff(Staff currentStaff);
}