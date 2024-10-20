package com.example.Hair_Salon_Project.Entity;

import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Comparator;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String note;

    private BookingStatus status = BookingStatus.PENDING;

    private Date createDate;

    private Date updateDate;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductClone product;

    @Column(nullable = false)
    private LocalDate bookingDate;

    @ManyToMany
    @JoinTable(name = "booking_time_slot", joinColumns = @JoinColumn(name = "booking_id"), inverseJoinColumns = @JoinColumn(name = "time_slot_id"))
    private List<TimeSlot> timeSlots;

    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }

    public LocalTime getFirstStartTime() {
        return timeSlots.stream()
                .map(TimeSlot::getStartTime)
                .min(Comparator.naturalOrder())
                .orElse(null);
    }

    public LocalTime getLastEndTime() {
        return timeSlots.stream()
                .map(TimeSlot::getEndTime)
                .max(Comparator.naturalOrder())
                .orElse(null);
    }
}
