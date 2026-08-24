package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "birds")
public class Bird {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameJa;

    private String nameEn;

    private String description;

    private String imageUrl;

    public Long getId() {
        return id;
    }

    public String getNameJa() {
        return nameJa;
    }

    public String getNameEn() {
        return nameEn;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}