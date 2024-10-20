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
    private long id;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    private Account account;

    private boolean isStaff;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false, updatable = false)
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date")
    private Date updateDate;

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Booking> bookings;

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Bill> bills;

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<TimeSlot> timeSlots;

    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }

    public void setIsStaff(boolean isStaff) {
        this.isStaff = isStaff;
    }

    // Method to set role with validation
    public void setRole(Role role) {
        if (role == Role.SUPER_USER) {
            throw new IllegalArgumentException("Role cannot be SUPER_USER.");
        }
        this.role = role;
    }

}
