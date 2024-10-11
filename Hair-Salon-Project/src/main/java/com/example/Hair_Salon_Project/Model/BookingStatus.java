package com.example.Hair_Salon_Project.Model;

import lombok.Data;

import java.util.Date;

@Data
public class BookingStatus {

     String note;
     String productType;
     Date bookingDate;
     String status;
     Date createDate;
     String staffName;

}
