package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_egresoRepository;

@Service
public class tipo_egresoService {
    
    @Autowired
    private tipo_egresoRepository repo;
}
