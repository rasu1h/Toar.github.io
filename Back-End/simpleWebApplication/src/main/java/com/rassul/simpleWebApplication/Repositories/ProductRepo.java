package com.rassul.simpleWebApplication.Repositories;

import com.rassul.simpleWebApplication.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {


}
