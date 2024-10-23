package com.example.Hair_Salon_Project.Model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
public class RegisterRequest {
    @Email(message = "Invalid email")
    private String email;

    private String firstName;

    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    private String gender;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})\\b", message = "Invalid phone number")
    private String phone;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
