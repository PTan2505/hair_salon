package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Entity.Enums.Role;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Staff findStaffById(Long id);

    List<Staff> findAllByRole(Role stylist);

}
