package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.tipo_inversion;

@Repository
public interface tipo_inversionRepository extends JpaRepository<tipo_inversion, Integer>{
    
}
