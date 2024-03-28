package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_presupuestoRepository;

@Service
public class tipo_presupuestoService {
    

    @Autowired
    private tipo_presupuestoRepository repo;
}
