package com.rassul.simpleWebApplication.Controllers;

import com.rassul.simpleWebApplication.Models.Product;
import com.rassul.simpleWebApplication.Services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
@AllArgsConstructor
public class    ProductController {
    private final ProductService service;

    @GetMapping("/products")
    public ResponseEntity <List<Product>> getAllProducts(){
        return new ResponseEntity<>(service.getProduct(), HttpStatus.OK) ;
    }
    @GetMapping("/products/{prodId}")
    public Product getProductById(@PathVariable int prodId){
        return service.gerProductById(prodId);
    }
    @PostMapping("/products/add_product")
    public void addProduct(@RequestBody Product prod){
        service.addProduct(prod);
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
