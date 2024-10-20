package com.example.Hair_Salon_Project.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Hair_Salon_Project.Entity.ProductType;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

    Optional<ProductType> findProductTypeById(Long id);

    Optional<ProductType> findProductTypeByName(String name);

    boolean existsByName(String name);
}
