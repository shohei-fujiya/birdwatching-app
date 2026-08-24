package com.example.backend.service;

import com.example.backend.entity.Area;
import com.example.backend.repository.AreaRepository;
import org.springframework.stereotype.Service;

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
}
