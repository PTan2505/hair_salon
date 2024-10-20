package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findProductById(Long id);

    boolean existsByName(String name);
}
