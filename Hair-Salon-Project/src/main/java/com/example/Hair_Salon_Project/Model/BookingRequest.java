package com.example.Hair_Salon_Project.Model;

import com.example.Hair_Salon_Project.Entity.Product;
import com.example.Hair_Salon_Project.Entity.Staff;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.util.Date;

@Data
public class BookingRequest {
    String note;
    String productType;
    Date bookingDate;
    @Temporal(TemporalType.TIMESTAMP)
    Date createDate;
    Staff staff;
    Product product;
}
