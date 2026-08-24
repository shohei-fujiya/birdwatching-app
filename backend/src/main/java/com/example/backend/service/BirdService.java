package com.example.backend.service;

import com.example.backend.entity.Bird;
import com.example.backend.repository.BirdRepository;
import org.springframework.stereotype.Service;

@Service
public class BirdService {

    private final BirdRepository birdRepository;

    public BirdService(BirdRepository birdRepository) {
        this.birdRepository = birdRepository;
    }

    public Bird getBirdById(Long id) {
        return birdRepository.findById(id)
                .orElse(null);
    }
}
