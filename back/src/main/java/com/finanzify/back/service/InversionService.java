package com.finanzify.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.InversionRepository;

@Service
public class InversionService {
    
    @Autowired
    private InversionRepository repo;
}
