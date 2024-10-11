package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductByType(String type);
    Product findProductById(Long id);
    @Query("SELECT p FROM Product p WHERE p.type = :type AND p.id = :id")
    Product findProductByTypeAndId(@Param("type") String type, @Param("id") Long id);
}
