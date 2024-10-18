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
    public Account approveCustomerToStaff(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account not found"));

        if (account.getRole() != Role.CUSTOMER) {
            throw new IllegalStateException("Account is not a customer");
        }

        account.setRole(Role.STAFF);

        Staff staff = new Staff();
        staff.setAccount(account);
        staff.setFirstName(account.getFirstName());
        staff.setLastName(account.getLastName());
        staff.setEmail(account.getEmail());
        staff.setPhone(account.getPhone());
        staff.setStatus(true);
        staff.setActive(true);

        staff.setRole(Role.STAFF);

        staffRepository.save(staff);
        account.setStaff(staff);


        return accountRepository.save(account);
    }
}