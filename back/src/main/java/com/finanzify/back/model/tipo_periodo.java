package com.finanzify.back.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class tipo_periodo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ind;

    private String nombre;

    @OneToMany(mappedBy="tipo", cascade = CascadeType.ALL)
    private List<Periodo> periodos;

    public tipo_periodo() {
    }

    public Long getInd() {
        return ind;
    }

    public void setInd(Long ind) {
        this.ind = ind;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Periodo> getPeriodos() {
        return periodos;
    }

    public void setPeriodos(List<Periodo> periodos) {
        this.periodos = periodos;
    }

    
}
