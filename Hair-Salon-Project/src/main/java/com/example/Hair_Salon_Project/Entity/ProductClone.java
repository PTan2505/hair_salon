package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProductClone {
    @Id
    private long id;

    private String productName;
}
