package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Account;
import lombok.Data;

@Data
public class EmailDetail {
    Account account;
    String subject;
    String link;
}
