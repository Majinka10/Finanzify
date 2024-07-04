package com.finanzify.back.model;

import java.util.Date;

import jakarta.persistence.*;

@Entity
public class Inversion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "usuario")
    private Usuario usuario;

    private int cantidad;
    private int rendimiento;

    @ManyToOne()
    @JoinColumn(name = "tipo")
    private tipo_inversion tipo;

    @Temporal(TemporalType.DATE)
    private Date fecha;

    private String descripcion;

    public Inversion() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getRendimiento() {
        return rendimiento;
    }

    public void setRendimiento(int rendimiento) {
        this.rendimiento = rendimiento;
    }

    public tipo_inversion getTipo() {
        return tipo;
    }

    public void setTipo(tipo_inversion tipo) {
        this.tipo = tipo;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    
}
