package com.rassul.simpleWebApplication.Controllers;

import com.rassul.simpleWebApplication.Models.Product;
import com.rassul.simpleWebApplication.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class    ProductController {
    @Autowired
    ProductService service;
    @GetMapping("/products")
    public ResponseEntity <List<Product>> getAllProducts(){
        return new ResponseEntity<>(service.getProduct(), HttpStatus.OK) ;
    }
    @GetMapping("/products/{prodId}")
    public Product getProductById(@PathVariable int prodId){
        return service.gerProductById(prodId);
    }


    @PostMapping("/products/add_product")
    public ResponseEntity<?>    addProduct(@RequestPart Product prod, @RequestPart MultipartFile imageFile) {
        try {
            Product savedProduct = service.addProduct(prod, imageFile);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/products/{prodId}")
    public void updateProduct(@PathVariable int prodId){
        service.updateProduct(prodId);
    }
    @DeleteMapping("/products/{prodId}")
    public void deleteProduct(@PathVariable int prodId){
        service.deleteProduct(prodId);
    }





}
