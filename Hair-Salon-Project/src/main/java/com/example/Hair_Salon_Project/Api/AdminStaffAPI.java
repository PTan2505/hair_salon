package com.example.Hair_Salon_Project.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Model.AccountUpdateRequest;
import com.example.Hair_Salon_Project.Model.RoleRequest;
import com.example.Hair_Salon_Project.Model.StaffRequest;
import com.example.Hair_Salon_Project.Model.StaffResponse;
import com.example.Hair_Salon_Project.Service.StaffService;

@RestController
@RequestMapping("/api/admin/staffs")
@PreAuthorize("hasRole('STYLIST') or hasRole('CASHIER')")
public class AdminStaffAPI {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public ResponseEntity<List<StaffResponse>> getAllStaff() {
        List<Staff> staffs = staffService.getAllStaff();
        return ResponseEntity.ok(staffService.generateStaffResponseList(staffs));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STYLIST') or hasRole('CASHIER')")
    public ResponseEntity<StaffResponse> getStaffById(@PathVariable Long id) {
        Staff staffs = staffService.getStaffByIdAuthorize(id);
        return ResponseEntity.ok(staffService.generateStaffResponse(staffs));
    }

    @PostMapping
    public ResponseEntity<StaffResponse> addStaff(@RequestBody StaffRequest staffRequest) {
        Staff addedStaff = staffService.addStaffByPhone(staffRequest);
        return ResponseEntity.ok(staffService.generateStaffResponse(addedStaff));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STYLIST') or hasRole('CASHIER')")
    public ResponseEntity<StaffResponse> updateStaff(
            @PathVariable long id,
            @RequestBody AccountUpdateRequest accountUpdateRequest) {
        Staff updatedStaff = staffService.updateStaff(id, accountUpdateRequest);
        return ResponseEntity.ok(staffService.generateStaffResponse(updatedStaff));
    }

    @PatchMapping("/update-role/{id}")
    public ResponseEntity<StaffResponse> updateRoleStaff(
            @PathVariable long id, @RequestBody RoleRequest roleRequest) {
        Staff updateStaff = staffService.updateRoleStaff(id, roleRequest);
        return ResponseEntity.ok(staffService.generateStaffResponse(updateStaff));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StaffResponse> deactivateStaff(
            @PathVariable long id) {
        Staff deactivateStaff = staffService.deactivateStaff(id);
        return ResponseEntity.ok(staffService.generateStaffResponse(deactivateStaff));
    }

}
