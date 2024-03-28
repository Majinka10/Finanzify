package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.EgresoRepository;

@Service
public class EgresoService {
    
    @Autowired
    private EgresoRepository repo;
}
