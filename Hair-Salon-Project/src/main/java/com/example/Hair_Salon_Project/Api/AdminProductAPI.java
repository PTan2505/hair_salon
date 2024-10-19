package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Product;
import com.example.Hair_Salon_Project.Model.ProductRequest;
import com.example.Hair_Salon_Project.Service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductAPI {

    @Autowired
    private ProductService productService;

    // Get all Products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Get a Product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product); // Simplified as getProductById throws exception if not found
    }

    // Create a new Product
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductRequest productRequest) {
        Product createdProduct = productService.createProduct(productRequest);
        return ResponseEntity.ok(createdProduct);
    }

    // Update an existing Product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id,
            @Valid @RequestBody ProductRequest productRequest) {
        Product updatedProduct = productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(updatedProduct); // Simplified as updateProduct throws exception if not found
    }

    // Delete a Product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}
