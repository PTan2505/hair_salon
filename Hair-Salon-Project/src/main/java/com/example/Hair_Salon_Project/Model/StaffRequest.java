package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StaffRequest {

    @NotBlank(message = "phone is required")
    private String phone; // Email or phone number of the staff member

    @NotBlank(message = "Role is required")
    private String role; // Role of the staff member, can be a string to match the enum

    public Role getRoleEnum() {
        return Role.valueOf(role.toUpperCase());
    }

}
