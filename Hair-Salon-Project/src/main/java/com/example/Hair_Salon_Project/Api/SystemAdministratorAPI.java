package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Service.SystemAdministratorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
//@SecurityRequirement(name="api")
public class SystemAdministratorAPI {

    @Autowired
    private SystemAdministratorService systemAdministratorService;

    @PostMapping("/approve-customer/{accountId}")
   // @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Account> approveCustomerToStaff(@PathVariable Long accountId) {
        Account updatedAccount = systemAdministratorService.approveCustomerToStaff(accountId);
        return ResponseEntity.ok(updatedAccount);
    }
}