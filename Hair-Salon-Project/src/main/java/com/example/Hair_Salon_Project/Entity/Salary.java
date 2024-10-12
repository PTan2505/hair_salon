package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double amount;

    private String period; // e.g., "2024-04"

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDate;

    @PrePersist
    protected void onCreate() {
        this.paymentDate = new Date();
    }
}
