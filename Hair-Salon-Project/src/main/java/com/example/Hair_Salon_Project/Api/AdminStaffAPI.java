package com.example.Hair_Salon_Project.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Model.StaffRequest;
import com.example.Hair_Salon_Project.Model.StaffResponse;
import com.example.Hair_Salon_Project.Service.StaffService;

@RestController
@RequestMapping("/api/admin/staffs")
public class AdminStaffAPI {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffs = staffService.getAllStaff();
        return ResponseEntity.ok(staffs);
    }

    @PostMapping
    public ResponseEntity<StaffResponse> addStaff(@RequestBody StaffRequest staffRequest) {
        Staff addedStaff = staffService.addStaffByPhone(staffRequest);
        return ResponseEntity.ok(convertToStaffResponse(addedStaff));
    }

    private StaffResponse convertToStaffResponse(Staff staff) {
        StaffResponse response = new StaffResponse();
        response.setStaffId(staff.getId());
        response.setRole(staff.getRole().name());
        response.setStaff(staff.isStaff());
        Account account = staff.getAccount();
        response.setFirstName(account.getFirstName());
        response.setLastName(account.getLastName());
        response.setEmail(account.getEmail());
        response.setPhone(account.getPhone());
        response.setGender(account.getGender().name());
        response.setBirthDate(account.getBirthDate());

        return response;
    }
}
