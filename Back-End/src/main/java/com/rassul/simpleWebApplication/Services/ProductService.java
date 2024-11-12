package com.rassul.simpleWebApplication.Services;

import com.rassul.simpleWebApplication.Exception.ResourceNotFoundException;
import com.rassul.simpleWebApplication.Models.Product;
import com.rassul.simpleWebApplication.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo repo;

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public String uploadFile(MultipartFile file) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        try {
            // Загружаем файл в S3
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(fileName)
                            .build(),
                    software.amazon.awssdk.core.sync.RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // Возвращаем URL, по которому файл будет доступен
            return "https://" + bucketName + ".s3." + "eu-north-1" + ".amazonaws.com/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Ошибка при загрузке файла в S3", e);
        }

    }

    public List<Product> getProduct(){
        return repo.findAll();
    }
    public Product getProductById(int prodId) {
        return repo.findById(prodId).orElseThrow(()->  new ResourceNotFoundException("Product not found with id: \"" + prodId));
    }

    public Product addProduct(Product prod, String imageCloudUrl) throws IOException {
        prod.setReleaseDate(LocalDate.now());
        prod.setImageUrl(imageCloudUrl);
        return  repo.save(prod);
    }

    public Product updateProduct(int prodId, Product productDetails) {
        Product product = getProductById(prodId);
        if (product != null) {
            // Update fields here
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            // Other fields to update
            return repo.save(product);
        }
        throw new RuntimeException("Product not found");
    }
    public void deleteProduct(int prodId){
      repo.deleteById(prodId);
    }
    @Transactional
    public List<Product> getProductSearch(String keyword) {
        return repo.searchByBrandAndDescriptionAndName(keyword);
    }
}
