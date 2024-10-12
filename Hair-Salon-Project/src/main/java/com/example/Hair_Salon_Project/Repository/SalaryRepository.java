package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Salary;
import com.example.Hair_Salon_Project.Entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
    List<Salary> findByStaff(Staff staff);
}
