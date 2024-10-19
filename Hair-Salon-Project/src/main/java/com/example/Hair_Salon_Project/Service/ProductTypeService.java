package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.ProductType;
import com.example.Hair_Salon_Project.Repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    // Get all ProductTypes
    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }

    // Get a ProductType by ID
    public ProductType getProductTypeById(long productTypeId) {
        return productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("ProductType not found"));
    }

    // Create a new ProductType
    public ProductType createProductType(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    // Update an existing ProductType
    public ProductType updateProductType(long productTypeId, ProductType productTypeDetails) {
        ProductType productType = productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("ProductType not found"));

        // Update fields (assuming ProductType has fields like name)
        productType.setName(productTypeDetails.getName());
        // Add more fields to update as necessary

        return productTypeRepository.save(productType);
    }

    // Delete a ProductType
    public void deleteProductType(long productTypeId) {
        if (!productTypeRepository.existsById(productTypeId)) {
            throw new RuntimeException("ProductType not found");
        }
        productTypeRepository.deleteById(productTypeId);
    }
}
