package com.example.Hair_Salon_Project.Model;

import lombok.Data;

@Data
public class AccountResponse {
    long id;
    String email;
    String phone;
    String token;
}
