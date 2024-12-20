package com.rassul.simpleWebApplication.Controllers;

import com.rassul.simpleWebApplication.Models.Product;
import com.rassul.simpleWebApplication.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService service;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(service.getProduct(), HttpStatus.OK);
    }

    @GetMapping("/products/{prodId}")
    public ResponseEntity<Product> getProductById(@PathVariable int prodId) {
        Product product = service.getProductById(prodId);
        return product != null ? new ResponseEntity<>(product, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("/products/add_product")
    public ResponseEntity<?> addProduct(@RequestPart Product prod,   @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            // Логируем входящие данные
            System.out.println("Received product: " + prod);
            System.out.println("Received file: " + imageFile.getOriginalFilename());

            String fileUrl = service.uploadFile(imageFile);
            Product savedProduct = service.addProduct(prod, fileUrl);

            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            // Логируем ошибку
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/products/{prodId}")
    public ResponseEntity<?> updateProduct(@PathVariable int prodId, @RequestBody Product prod) {
        try {
            Product updatedProduct = service.updateProduct(prodId, prod);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/products/{prodId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int prodId) {
        try {
            service.deleteProduct(prodId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/products/search")
    public List<Product> searchProduct(@RequestParam String keyword){
        return service.getProductSearch(keyword);
    }
    }