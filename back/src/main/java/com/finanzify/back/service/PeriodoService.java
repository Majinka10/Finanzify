package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.PeriodoRepository;

@Service
public class PeriodoService {
    
    @Autowired
    private PeriodoRepository repo;
}
