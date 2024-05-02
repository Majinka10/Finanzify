package com.finanzify.back.service;

import com.finanzify.back.model.Ingreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.IngresoRepository;

import java.util.List;

@Service
public class IngresoService {
    
    @Autowired
    private IngresoRepository repo;

    public List<Ingreso> getIngresosByCorreo(String correo) {
        return repo.findByUsuario(correo);
    }

    public List<Ingreso> getIngresosByCorreoRecent(String correo) {
        return repo.findByUsuarioRecent(correo);
    }
}
