package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Staff;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findById(Long id);

    @Query("SELECT s FROM Staff s WHERE s.account.phone = :phone")
    Optional<Staff> findByPhone(@Param("phone") String phone);

    @Query("SELECT s FROM Staff s WHERE s.account.id = :id")
    Optional<Staff> getStaffByAccountId(@Param("id") long id);
}
