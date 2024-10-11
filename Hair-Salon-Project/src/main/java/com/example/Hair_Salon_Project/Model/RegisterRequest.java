package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Data
public class RegisterRequest {
    @Email(message = "Invalid email")
    @Column(unique = true)
    String email;

    @NotBlank(message = "First name cannot be empty")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    private String lastName;

    private Date birthday;

    private String gender;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})\\b" , message = "Invalid phone number")
    @Column(unique = true)
    String phone;
    @Size(min = 6 , message = "Password must be exceed 6 characters ")
    String password;

    @Enumerated(EnumType.STRING)
    Role role;
}
