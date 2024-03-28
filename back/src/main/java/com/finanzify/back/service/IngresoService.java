package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.IngresoRepository;

@Service
public class IngresoService {
    
    @Autowired
    private IngresoRepository repo;
}
