package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.tipo_egreso;

@Repository
public interface tipo_egresoRepository extends JpaRepository<tipo_egreso, Integer>{
    
}
