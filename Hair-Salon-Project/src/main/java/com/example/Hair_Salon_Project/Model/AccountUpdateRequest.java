package com.example.Hair_Salon_Project.Model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.Date;

@Data
public class AccountUpdateRequest {

    String firstName;

    String lastName;

    String gender;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})\\b", message = "Invalid phone number")
    @Column(unique = true)
    String phone;

    Date birthday;

}
