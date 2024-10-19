package com.example.Hair_Salon_Project.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hair_Salon_Project.Entity.ProductType;
import com.example.Hair_Salon_Project.Model.ProductTypeRequest;
import com.example.Hair_Salon_Project.Service.ProductTypeService;

@RestController
@RequestMapping("/api/admin/product-types")
public class AdminProductTypeAPI {
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

    @PostMapping
    public ResponseEntity<ProductType> createProductType(@RequestBody ProductTypeRequest productTypeRequest) {
        ProductType createdProductType = productTypeService.createProductType(productTypeRequest);
        return ResponseEntity.ok(createdProductType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductType> updateProductType(@PathVariable long id,
            @RequestBody ProductTypeRequest productTypeRequest) {
        ProductType updatedProductType = productTypeService.updateProductType(id, productTypeRequest);
        return ResponseEntity.ok(updatedProductType);
    }

    // Delete a ProductType
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductType(@PathVariable long id) {
        productTypeService.deleteProductType(id);
        return ResponseEntity.noContent().build();
    }
}
