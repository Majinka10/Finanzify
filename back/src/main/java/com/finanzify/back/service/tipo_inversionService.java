package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_inversionRepository;

@Service
public class tipo_inversionService {
    
    @Autowired
    private tipo_inversionRepository repo;
}
