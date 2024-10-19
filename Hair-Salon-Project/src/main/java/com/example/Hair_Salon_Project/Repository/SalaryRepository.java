package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.PayRoll;
import com.example.Hair_Salon_Project.Entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalaryRepository extends JpaRepository<PayRoll, Long> {
    List<PayRoll> findByStaff(Staff staff);
}
