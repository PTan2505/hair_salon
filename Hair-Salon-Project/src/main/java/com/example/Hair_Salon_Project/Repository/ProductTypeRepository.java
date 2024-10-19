package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

    // Find a ProductType by ID
    ProductType findProductTypeById(Long id);

    // Find a ProductType by name (if needed)
    ProductType findProductTypeByName(String name);

    // Optional method to find by ID, for more flexibility
    Optional<ProductType> findById(Long id);
}
