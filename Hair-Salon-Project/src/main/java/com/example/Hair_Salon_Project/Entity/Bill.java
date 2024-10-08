package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
