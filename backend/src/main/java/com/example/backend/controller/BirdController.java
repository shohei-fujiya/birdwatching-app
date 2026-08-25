package com.example.backend.controller;

import com.example.backend.entity.Bird;
import com.example.backend.service.BirdService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/birds")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class BirdController {

    private final BirdService birdService;

    public BirdController(BirdService birdService) {
        this.birdService = birdService;
    }

    @GetMapping("/{id}")
    public Bird getBirdById(@PathVariable Long id) {
        return birdService.getBirdById(id);
    }

    @GetMapping
    public List<Bird> getAllBirds() {
        return birdService.getAllBirds();
    }
}
