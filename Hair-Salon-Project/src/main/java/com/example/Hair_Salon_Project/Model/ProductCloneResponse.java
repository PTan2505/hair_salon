package com.example.Hair_Salon_Project.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCloneResponse {
    private String type;
    private String name;
    private float price;
    private int points;
    private String typeImage;
}