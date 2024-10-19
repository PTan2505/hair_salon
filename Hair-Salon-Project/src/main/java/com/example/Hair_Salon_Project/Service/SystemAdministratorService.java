package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SystemAdministratorService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Transactional
    public Account approveCustomerToStaff(Long accountId, Role selectedRole) {
        // Retrieve the account by ID
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account not found"));

        // Check if the account is already associated with an active staff member
        Staff existingStaff = staffRepository.findStaffById(account.getId());
        if (existingStaff != null && existingStaff.isStaff()) {
            throw new IllegalStateException("Account is already a staff member!");
        }

        // Create a new Staff entity
        Staff staff = new Staff();
        staff.setAccount(account);
        staff.setIsStaff(true); // Set the isStaff flag to true
        staff.setRole(selectedRole); // Set the selected role for staff

        // Save the new Staff entity
        staffRepository.save(staff);

        // Return the updated account (optional)
        return account;
    }
}
