package com.proyecto.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity 
@Table (name= "recepcion")
public class Recepcion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "IDRECEPCION")
    private Integer idRecepcion;

    @Column (name = "num_solicitud", nullable = false, length = 45)
    private String numSolicitud;
@Column(name = "fecha_hora_recepcion", insertable = false, updatable = false)
    private LocalDateTime fechaHoraRecepcion;

    @Column(name = "estado_visual", columnDefinition = "TEXT")
    private String estadoVisual;

    @Column(name = "accesorios_entregados", columnDefinition = "TEXT")
    private String accesoriosEntregados;

    // Relación de Llave Foránea (MUL) con la tabla Tecnico
    @ManyToOne
    @JoinColumn(name = "id_tecnico", nullable = false)
    private Tecnico tecnico;

    // Constructor vacío (Obligatorio para JPA)
    public Recepcion() {
    }

    // Getters y Setters
    public Integer getIdRecepcion() {
        return idRecepcion;
    }

    public void setIdRecepcion(Integer idRecepcion) {
        this.idRecepcion = idRecepcion;
    }

    public String getNumSolicitud() {
        return numSolicitud;
    }

    public void setNumSolicitud(String numSolicitud) {
        this.numSolicitud = numSolicitud;
    }

    public LocalDateTime getFechaHoraRecepcion() {
        return fechaHoraRecepcion;
    }

    public void setFechaHoraRecepcion(LocalDateTime fechaHoraRecepcion) {
        this.fechaHoraRecepcion = fechaHoraRecepcion;
    }

    public String getEstadoVisual() {
        return estadoVisual;
    }

    public void setEstadoVisual(String estadoVisual) {
        this.estadoVisual = estadoVisual;
    }

    public String getAccesoriosEntregados() {
        return accesoriosEntregados;
    }

    public void setAccesoriosEntregados(String accesoriosEntregados) {
        this.accesoriosEntregados = accesoriosEntregados;
    }

    public Tecnico getTecnico() {
        return tecnico;
    }

    public void setTecnico(Tecnico tecnico) {
        this.tecnico = tecnico;
    }
}
