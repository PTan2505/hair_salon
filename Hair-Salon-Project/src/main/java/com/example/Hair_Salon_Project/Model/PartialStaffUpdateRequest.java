package com.example.Hair_Salon_Project.Model;

import lombok.Data;

import com.example.Hair_Salon_Project.Entity.Enums.Role;

@Data
public class PartialStaffUpdateRequest {
    private Boolean isStaff;

    private String role;

    public Role getRoleEnum() {
        return Role.valueOf(role.toUpperCase());
    }

}
