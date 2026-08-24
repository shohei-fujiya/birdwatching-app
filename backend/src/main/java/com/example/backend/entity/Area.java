package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "areas")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private  String name;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
