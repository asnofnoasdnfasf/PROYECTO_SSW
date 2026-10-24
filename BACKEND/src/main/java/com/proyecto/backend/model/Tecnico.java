package com.proyecto.backend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "tecnico")
public class Tecnico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDTECNICO")
    private Integer idTecnico;

    @Column(name = "NOMTEC", nullable = false, length = 100)
    private String nomtec;

    // Constructor vacío (Obligatorio para JPA)
    public Tecnico() {
    }

    // Getters y Setters
    public Integer getIdTecnico() {
        return idTecnico;
    }

    public void setIdTecnico(Integer idTecnico) {
        this.idTecnico = idTecnico;
    }

    public String getNomtec() {
        return nomtec;
    }

    public void setNomtec(String nomtec) {
        this.nomtec = nomtec;
    }

}
