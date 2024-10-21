package com.rassul.simpleWebApplication.Models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;


@Column(name = "prod_name", length = 100) // Указание длины для строки
private String name;

private String description ;

private String brand;

@Column(name = "price", precision = 10, scale = 2) // Указание для числового типа
private BigDecimal price;

private LocalDate releaseDate;

private String Category;

@Column(name = "available", nullable = true, columnDefinition = "boolean default true")
private boolean available;

@Column(nullable = false, columnDefinition = "int default 1")
private int quantity;

private String imageName;
private String imageType;

@Lob
private byte[] imageData;
}
