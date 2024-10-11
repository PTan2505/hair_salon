package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Staff findStaffById(Long id);

    @Query("SELECT s FROM Staff s WHERE s.active = true AND s.status = true AND s.role = :role AND s.bookings IS EMPTY")
    Staff findAvailableStylist(Role role);
}
