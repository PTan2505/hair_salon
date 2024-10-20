package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import jakarta.validation.constraints.NotBlank;

public class StaffRequest {

    @NotBlank(message = "Email or phone is required")
    private String emailOrPhone; // Email or phone number of the staff member

    @NotBlank(message = "Role is required")
    private String role; // Role of the staff member, can be a string to match the enum

    // Getters and Setters
    public String getEmailOrPhone() {
        return emailOrPhone;
    }

    public void setEmailOrPhone(String emailOrPhone) {
        this.emailOrPhone = emailOrPhone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Role getRoleEnum() {
        return Role.valueOf(role.toUpperCase());
    }

}
