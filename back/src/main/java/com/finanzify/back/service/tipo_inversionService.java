package com.finanzify.back.service;

import com.finanzify.back.model.tipo_inversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.tipo_inversionRepository;

import java.util.List;

@Service
public class tipo_inversionService {
    
    @Autowired
    private tipo_inversionRepository repo;

    public List<tipo_inversion> getAll() {
        return this.repo.findAll();
    }
}
