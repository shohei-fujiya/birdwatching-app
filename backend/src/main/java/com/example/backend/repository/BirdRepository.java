package com.example.backend.repository;

import com.example.backend.entity.Bird;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BirdRepository extends JpaRepository<Bird,Long> {
}
