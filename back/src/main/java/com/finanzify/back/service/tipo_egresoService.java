package com.finanzify.back.service;

import com.finanzify.back.model.tipo_egreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_egresoRepository;

import java.util.List;

@Service
public class tipo_egresoService {
    
    @Autowired
    private tipo_egresoRepository repo;

    public List<tipo_egreso> getAll() {
        return repo.findAll();
    }
}
