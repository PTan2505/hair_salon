package com.example.Hair_Salon_Project.Model;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class ProductTypeRequest {
    @NotBlank(message = "Name cannot be blank")
    private String name; // Not nullable and cannot be blank
    @NotBlank(message = "Image cannot be blank")
    private String image; // Not nullable and cannot be blank
}
