package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Entity.Enums.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findById(Long id);

    @Query("SELECT s FROM Staff s WHERE s.account.phone = :phone")
    Optional<Staff> findByPhone(String phone);

    List<Staff> findByRole(Role role);
}
