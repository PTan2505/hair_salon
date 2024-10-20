package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Staff;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmailOrPhone(String emailOrPhone);

    Optional<Staff> findById(Long id);

}
