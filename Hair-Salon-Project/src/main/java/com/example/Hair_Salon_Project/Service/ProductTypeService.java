package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.ProductType;
import com.example.Hair_Salon_Project.Model.ProductTypeRequest;
import com.example.Hair_Salon_Project.Repository.ProductTypeRepository;
import jakarta.validation.ConstraintViolationException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductTypeService {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    ModelMapper modelMapper;

    // Get all ProductTypes
    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }

    // Get ProductType by ID
    public ProductType getProductTypeById(long productTypeId) {
        return productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("ProductType not found"));
    }

    // Create new ProductType
    public ProductType createProductType(ProductTypeRequest productTypeRequest) {
        try {
            ProductType newProductType = modelMapper.map(productTypeRequest, ProductType.class);
            return productTypeRepository.save(newProductType);
        } catch (ConstraintViolationException e) {
            String violations = e.getConstraintViolations().stream()
                    .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: " + violation.getMessage())
                    .collect(Collectors.joining(", "));
            throw new RuntimeException(violations);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred during product type creation: " + e.getMessage(), e);
        }
    }

    // Update ProductType
    public ProductType updateProductType(long productTypeId, ProductTypeRequest productTypeRequest) {
        ProductType productType = getProductTypeById(productTypeId);
        if (productType != null) {
            try {
                modelMapper.map(productTypeRequest, productType);
                return productTypeRepository.save(productType);
            } catch (ConstraintViolationException e) {
                String violations = e.getConstraintViolations().stream()
                        .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: "
                                + violation.getMessage())
                        .collect(Collectors.joining(", "));
                throw new RuntimeException(violations);
            } catch (Exception e) {
                throw new RuntimeException("An error occurred during product type update: " + e.getMessage(), e);
            }
        }
        throw new RuntimeException("ProductType not found");
    }

    // Delete a ProductType
    public void deleteProductType(long productTypeId) {
        ProductType productType = getProductTypeById(productTypeId);
        productTypeRepository.delete(productType);
    }
}
