package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long staff_id;
    long account_Id;
    boolean staff_status;
    boolean is_manager;
    boolean is_active;
    Date created_at;
    Date updated_at;
    String role;
}
