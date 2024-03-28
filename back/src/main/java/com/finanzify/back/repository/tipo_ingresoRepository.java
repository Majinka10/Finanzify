package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.tipo_ingreso;

@Repository
public interface tipo_ingresoRepository extends JpaRepository<tipo_ingreso, Integer>{
    
}
