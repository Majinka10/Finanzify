package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_ingresoRepository;

@Service
public class tipo_ingresoService {
    
    @Autowired
    private tipo_ingresoRepository repo;
}
