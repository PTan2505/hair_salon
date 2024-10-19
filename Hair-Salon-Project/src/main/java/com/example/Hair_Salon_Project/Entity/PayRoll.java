package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class PayRoll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @DecimalMin(value = "0.0", inclusive = true)
    private double percentOfBill;

    @DecimalMin(value = "0.0", inclusive = false, message = "Base salary must be greater than zero")
    private double baseSalary;

    @DecimalMin(value = "0.0", inclusive = false, message = "Tips must be greater than or equal to zero")
    private double tips;

    private Double bonus;

    private Double deductions;

    @DecimalMin(value = "0.0", inclusive = false, message = "Total salary must be greater than zero")
    private double totalSalary;

    @NotEmpty(message = "Payment method cannot be empty")
    @Size(max = 20, message = "Payment method must be less than or equal to 20 characters")
    private String paymentMethod;

    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDate;

    @PrePersist
    protected void onCreate() {
        this.paymentDate = new Date();
    }
}
