package com.example.Hair_Salon_Project.Model;

import lombok.Data;
import java.util.Optional;

@Data
public class ProductTypeRequest {
    private Optional<String> name = Optional.empty();
    private Optional<String> image = Optional.empty();
}
