package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.Role;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RoleRequest {
    @NotBlank(message = "Role is required")
    private String role;

    public Role getRoleEnum() {
        return Role.valueOf(role.toUpperCase());
    }
}
