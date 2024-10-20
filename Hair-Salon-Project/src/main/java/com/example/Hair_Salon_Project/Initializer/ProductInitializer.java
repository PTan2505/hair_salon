package com.example.Hair_Salon_Project.Initializer;

import com.example.Hair_Salon_Project.Entity.Product;
import com.example.Hair_Salon_Project.Entity.ProductType;
import com.example.Hair_Salon_Project.Model.ProductRequest;
import com.example.Hair_Salon_Project.Model.ProductTypeRequest;
import com.example.Hair_Salon_Project.Repository.ProductRepository;
import com.example.Hair_Salon_Project.Repository.ProductTypeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProductInitializer {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init() {
        try {
            loadProductTypes();
            loadProducts();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadProductTypes() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:data/product_types.json");
        List<ProductTypeRequest> productTypes = objectMapper.readValue(
                Files.readAllBytes(Paths.get(resource.getURI())),
                new TypeReference<List<ProductTypeRequest>>() {
                });

        for (ProductTypeRequest request : productTypes) {
            if (!productTypeRepository.existsByName(request.getName())) {
                ProductType productType = new ProductType(request.getName(), request.getImage());
                productTypeRepository.save(productType);
            }
        }
    }

    private void loadProducts() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:data/products.json");
        List<ProductRequest> products = objectMapper.readValue(
                Files.readAllBytes(Paths.get(resource.getURI())),
                new TypeReference<List<ProductRequest>>() {
                });

        for (ProductRequest request : products) {
            if (!productRepository.existsByName(request.getName())) {
                Product product = new Product();
                product.setName(request.getName());
                product.setPrice(request.getPrice());
                product.setPoints(request.getPoints());
                product.setTime(request.getTime());
                ProductType productType = productTypeRepository.findById(request.getProductTypeId()).orElse(null);
                product.setProductType(productType);
                productRepository.save(product);
            }
        }
    }
}
