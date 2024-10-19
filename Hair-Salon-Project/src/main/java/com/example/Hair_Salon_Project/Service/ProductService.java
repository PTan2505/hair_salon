package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Product;
import com.example.Hair_Salon_Project.Entity.ProductType;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Model.ProductRequest;
import com.example.Hair_Salon_Project.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import jakarta.validation.ConstraintViolationException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductTypeService productTypeService;

    @Autowired
    ModelMapper modelMapper;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(ProductRequest productRequest) {
        try {
            Product newProduct = modelMapper.map(productRequest, Product.class);
            ProductType productType = productTypeService.getProductTypeById(productRequest.getProductTypeId());
            newProduct.setProductType(productType);
            return productRepository.save(newProduct);
        } catch (ConstraintViolationException e) {
            String violations = e.getConstraintViolations().stream()
                    .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: " + violation.getMessage())
                    .collect(Collectors.joining(", "));
            throw new RuntimeException(violations);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred during product creation: " + e.getMessage(), e);
        }
    }

    public Product getProductById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
    }

    public Product updateProduct(long id, ProductRequest productRequest) {
        try {
            Product product = getProductById(id);
            modelMapper.map(productRequest, product);
            ProductType productType = productTypeService.getProductTypeById(productRequest.getProductTypeId());
            product.setProductType(productType);

            return productRepository.save(product);
        } catch (ConstraintViolationException e) {
            String violations = e.getConstraintViolations().stream()
                    .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: "
                            + violation.getMessage())
                    .collect(Collectors.joining(", "));
            throw new RuntimeException(violations);
        }
    }

    public void deleteProduct(long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

}
