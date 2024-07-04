package com.finanzify.back.service;

import com.finanzify.back.model.Inversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.InversionRepository;

import java.util.List;

@Service
public class InversionService {
    
    @Autowired
    private InversionRepository repo;

    public List<Inversion> getInversionesUsuario(String correo) {
        return repo.findByUsuarioCorreo(correo);
    }
}
