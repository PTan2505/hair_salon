package com.example.Hair_Salon_Project.Entity;

import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus; // Import the enum
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String note; // Optional note for the booking

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookingDate; // Date and time for the booking

    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store the enum as a String
    private BookingStatus status = BookingStatus.PENDING; // Default status upon creation

    private Date createDate;

    private Date updateDate;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account; // Reference to the customer making the booking

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff; // Reference to the assigned stylist

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // Reference to the service being booked

    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }
}
