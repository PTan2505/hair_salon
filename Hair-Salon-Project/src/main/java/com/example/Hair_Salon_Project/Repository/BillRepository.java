package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Bill;
import com.example.Hair_Salon_Project.Entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByStaff(Staff staff);
}
