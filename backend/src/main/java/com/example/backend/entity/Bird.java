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
}