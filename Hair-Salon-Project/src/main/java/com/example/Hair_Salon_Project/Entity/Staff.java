package com.example.Hair_Salon_Project.Entity;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; // PK for Staff

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false) // FK to Account
    private Account account; // Reference to the corresponding Account

    private boolean isStaff; // Indicates if the user is still a staff member

    @Enumerated(EnumType.STRING)
    private Role role; // Role of the staff (e.g., STYLIST, CASHIER, etc.)

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false, updatable = false)
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date")
    private Date updateDate;

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Booking> bookings; // Reference to bookings associated with the staff

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Bill> bills; // Reference to bills associated with the staff

    // Lifecycle callbacks for date fields
    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }
}
