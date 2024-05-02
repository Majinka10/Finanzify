package com.finanzify.back.service;

import com.finanzify.back.model.tipo_ingreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_ingresoRepository;

import java.util.List;

@Service
public class tipo_ingresoService {
    
    @Autowired
    private tipo_ingresoRepository repo;

    public List<tipo_ingreso> getAll() {
        return repo.findAll();
    }
}
