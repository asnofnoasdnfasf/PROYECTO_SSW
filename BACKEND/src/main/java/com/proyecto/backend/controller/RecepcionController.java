package com.proyecto.backend.controller;

import com.proyecto.backend.model.Recepcion;
import com.proyecto.backend.repository.RecepcionRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recepciones")
public class RecepcionController {

    private final RecepcionRepository recepcionRepository;

    public RecepcionController(RecepcionRepository recepcionRepository) {
        this.recepcionRepository = recepcionRepository;
    }

    @PostMapping
    public ResponseEntity<Recepcion> crearRecepcion(
            @RequestBody Recepcion recepcion) {

        recepcion.setIdRecepcion(null);

        Recepcion nuevaRecepcion = recepcionRepository.save(recepcion);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevaRecepcion);
    }
}
