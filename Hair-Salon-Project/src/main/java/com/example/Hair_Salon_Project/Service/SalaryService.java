package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Salary;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Repository.SalaryRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private StaffRepository staffRepository;

    public List<Salary> getSalariesByStaff(long staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        return salaryRepository.findByStaff(staff);
    }

    // Additional methods for managing salaries can be added here
}
