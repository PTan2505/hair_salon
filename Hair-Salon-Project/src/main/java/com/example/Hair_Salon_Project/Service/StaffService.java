package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Model.StaffRequest;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.validation.ConstraintViolationException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private AccountRepository accountRepository; // Assuming you have an AccountRepository

    @Autowired
    private ModelMapper modelMapper;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff addStaffByEmailOrPhone(StaffRequest staffRequest) {
        // Check if staff already exists
        Optional<Staff> existingStaff = staffRepository.findByEmailOrPhone(staffRequest.getEmailOrPhone());
        if (existingStaff.isPresent()) {
            throw new RuntimeException(
                    "Staff member already exists with email or phone: " + staffRequest.getEmailOrPhone());
        }

        Optional<Account> existingAccount = accountRepository.findByEmailOrPhone(staffRequest.getEmailOrPhone());
        if (existingAccount.isPresent()) {
            Account account = existingAccount.get();
            Staff newStaff = new Staff();
            newStaff.setAccount(account);
            newStaff.setRole(staffRequest.getRoleEnum());
            return staffRepository.save(newStaff);
        } else {
            throw new NotFoundException("No account found with email or phone: " + staffRequest.getEmailOrPhone());
        }
    }

    public Staff getStaffById(long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Staff not found with id: " + id));
    }

    public Staff updateStaff(long id, StaffRequest staffRequest) {
        try {
            Staff staff = getStaffById(id);
            modelMapper.map(staffRequest, staff); // Map the request to the existing staff entity
            return staffRepository.save(staff);
        } catch (ConstraintViolationException e) {
            String violations = e.getConstraintViolations().stream()
                    .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: "
                            + violation.getMessage())
                    .collect(Collectors.joining(", "));
            throw new RuntimeException(violations);
        }
    }

    public void deleteStaff(long id) {
        Staff staff = getStaffById(id);
        staffRepository.delete(staff);
    }
}
