package com.finanzify.back.service;

import com.finanzify.back.model.Egreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.EgresoRepository;

import java.util.List;

@Service
public class EgresoService {
    
    @Autowired
    private EgresoRepository repo;

    public List<Egreso> getEgresosByCorreo(String correo){
        return repo.findByUsuario(correo);
    }

    public List<Egreso> getEgresosByCorreoRecent(String correo){
        return repo.findByUsuarioRecent(correo);
    }
}
