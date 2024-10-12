package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RegisterRequest {
    @Email(message = "Invalid email")
    @Column(unique = true)
    String email;

    private String firstName;
    private String lastName;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    private String gender;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})\\b" , message = "Invalid phone number")
    @Column(unique = true)
    String phone;
    @Size(min = 6 , message = "Password must be exceed 6 characters ")
    String password;
    Role role;
}
