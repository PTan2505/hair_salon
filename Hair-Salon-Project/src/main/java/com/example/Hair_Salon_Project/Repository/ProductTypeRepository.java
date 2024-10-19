package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

    ProductType findProductTypeById(Long id);

    ProductType findProductTypeByName(String name);
}
