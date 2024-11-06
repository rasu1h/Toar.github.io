package com.rassul.simpleWebApplication.Services;

import com.rassul.simpleWebApplication.Exception.ResourceNotFoundException;
import com.rassul.simpleWebApplication.Models.Product;
import com.rassul.simpleWebApplication.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo repo;

    public List<Product> getProduct(){
        return repo.findAll();
    }
    public Product gerProductById(int prodId) {
        return repo.findById(prodId).orElseThrow(()->  new ResourceNotFoundException("Product not found with id: \"" + prodId));
    }

    public Product addProduct(Product prod, MultipartFile imageFile) throws IOException {
        prod.setReleaseDate(LocalDate.now());
        prod.setImageName(imageFile.getOriginalFilename());
        prod.setImageType(imageFile.getContentType());
        prod.setImageData(imageFile.getBytes());
        return  repo.save(prod);
    }

    public void updateProduct(int prodId) {
     repo.save(gerProductById(prodId));
    }
    public void deleteProduct(int prodId){
      repo.deleteById(prodId);
    }
}
