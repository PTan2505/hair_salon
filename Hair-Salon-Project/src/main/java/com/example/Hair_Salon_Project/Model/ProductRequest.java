package com.example.Hair_Salon_Project.Model;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private float price;
    private int points;
    private int time;
    private long productTypeId; // This assumes you're associating the product with a ProductType
}
