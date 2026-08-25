package com.example.backend.service;

import com.example.backend.entity.Area;
import com.example.backend.repository.AreaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaService {

    private final AreaRepository areaRepository;

    public AreaService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    public Area getAreaById(Long id) {
        return areaRepository.findById(id)
        .orElse(null);
    }

    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }
}
