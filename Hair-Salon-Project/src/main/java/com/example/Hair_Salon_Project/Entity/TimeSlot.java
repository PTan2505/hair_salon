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
    private long id;

    private LocalTime startTime;

    private LocalTime endTime;
}
