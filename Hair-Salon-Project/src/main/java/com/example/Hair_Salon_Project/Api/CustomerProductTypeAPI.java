package com.example.Hair_Salon_Project.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hair_Salon_Project.Entity.ProductType;
import com.example.Hair_Salon_Project.Service.ProductTypeService;

@RestController
@RequestMapping("/api/customers/product-types")
public class CustomerProductTypeAPI {
    @Autowired
    private ProductTypeService productTypeService;

    // Get all ProductTypes
    @GetMapping
    public ResponseEntity<List<ProductType>> getAllProductTypes() {
        List<ProductType> productTypes = productTypeService.getAllProductTypes();
        return ResponseEntity.ok(productTypes);
    }

    // Get a ProductType by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductType> getProductTypeById(@PathVariable long id) {
        ProductType productType = productTypeService.getProductTypeById(id);
        return ResponseEntity.ok(productType);
    }

}
