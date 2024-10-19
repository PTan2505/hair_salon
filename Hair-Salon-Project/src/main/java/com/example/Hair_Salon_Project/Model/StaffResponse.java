package com.example.Hair_Salon_Project.Model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffResponse {
    private Long staffId;
    private String role;
    private boolean isStaff;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private LocalDate birthDate;

}
