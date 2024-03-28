package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_periodoRepository;

@Service
public class tipo_periodoService {
    
    @Autowired
    private tipo_periodoRepository repo;
}
