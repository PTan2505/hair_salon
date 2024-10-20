package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.ProductClone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCloneRepository extends JpaRepository<ProductClone, Long> {
}