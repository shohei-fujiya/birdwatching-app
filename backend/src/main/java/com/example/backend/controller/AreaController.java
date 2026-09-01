package com.example.backend.controller;

import com.example.backend.entity.Area;
import com.example.backend.service.AreaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/areas")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "https://zooming-caring-production-76bc.up.railway.app"
})
public class AreaController {

    private final AreaService areaService;

    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }

    @GetMapping
    public List<Area> getAllAreas() {
        return areaService.getAllAreas();
    }
}
