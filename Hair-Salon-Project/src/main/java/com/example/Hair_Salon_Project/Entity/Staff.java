package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long staff_id;

    @OneToOne
    @JoinColumn(name = "account_id")
    Account account;

    boolean staff_status;

    boolean is_manager;

    boolean is_active;

    Date created_at;

    Date updated_at;

    String role;


}
