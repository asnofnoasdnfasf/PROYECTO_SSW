package com.proyecto.backend.repository;
import com.proyecto.backend.model.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TecnicoRepository extends JpaRepository<Tecnico, Integer> {
    // Hereda automáticamente el método findAll() para listar todo
}
