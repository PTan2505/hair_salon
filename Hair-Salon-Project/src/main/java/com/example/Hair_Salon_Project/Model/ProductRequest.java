package com.example.Hair_Salon_Project.Model;

import lombok.Data;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Data
public class ProductRequest {
    @NotBlank(message = "Name cannot be blank")
    private String name; // Not nullable and cannot be blank
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private float price; // Not nullable
    @Min(value = 0, message = "Points must be greater than or equal to 0")
    private int points; // Not nullable
    @Min(value = 0, message = "Time must be greater than or equal to 0")
    private int time; // Not nullable
    @Min(value = 1, message = "ProductTypeId must be greater than 0")
    private long productTypeId; // Not nullable
}
