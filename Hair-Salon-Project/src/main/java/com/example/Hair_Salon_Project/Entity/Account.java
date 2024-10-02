package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long account_Id;
    String First_name;
    String Last_name;
    String Email;
    String Password;
    Date Birthday;
    String Gender;
    boolean Active;
    Date Create_Date;
    Date Update_Date;

}
