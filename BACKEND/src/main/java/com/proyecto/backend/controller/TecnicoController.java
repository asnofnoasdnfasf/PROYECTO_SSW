package com.proyecto.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.proyecto.backend.model.Tecnico;
import com.proyecto.backend.repository.TecnicoRepository;
@RestController
@RequestMapping("/api/tecnicos")
@CrossOrigin(origins = "*") 
public class TecnicoController {

    @Autowired
    private TecnicoRepository tecnicoRepository;
  @GetMapping
    public List<Tecnico> listarTecnicos() {
        return tecnicoRepository.findAll();
    }
}
