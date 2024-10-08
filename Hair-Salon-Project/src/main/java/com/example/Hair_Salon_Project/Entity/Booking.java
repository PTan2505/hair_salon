package com.example.Hair_Salon_Project.Entity;

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

    String note;

    private Date bookingDate;

    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date Create_At;

    @Temporal(TemporalType.TIMESTAMP)
    private Date Update_At;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;





}
