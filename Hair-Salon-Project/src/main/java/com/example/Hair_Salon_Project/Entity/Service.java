package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;

    private String service_name;

    private float service_price;

    private int point;

    private String image;

    @Temporal(TemporalType.TIMESTAMP)
    private Date Create_At;

    @Temporal(TemporalType.TIMESTAMP)
    private Date Update_At;

    @OneToMany(mappedBy = "service") // Một nhân viên có thể có nhiều booking
    private List<Booking> bookings;
}
