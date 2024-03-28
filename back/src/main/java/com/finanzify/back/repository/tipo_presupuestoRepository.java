package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.tipo_presupuesto;

@Repository
public interface tipo_presupuestoRepository extends JpaRepository<tipo_presupuesto, Integer>{
    
}
