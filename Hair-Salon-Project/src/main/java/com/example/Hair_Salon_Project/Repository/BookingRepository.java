package com.example.Hair_Salon_Project.Repository;


import com.example.Hair_Salon_Project.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findBookingById(Long id);
    List<Booking> findBookingByAccount_Id(Long accountId);
}
