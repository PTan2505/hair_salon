package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class TimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; // PK for TimeSlot

    private LocalTime startTime; // Start time of the slot

    private LocalTime endTime; // End time of the slot

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff; // Reference to the associated Staff member
}
