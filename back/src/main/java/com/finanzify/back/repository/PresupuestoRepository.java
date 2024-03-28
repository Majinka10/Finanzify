package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Presupuesto;

@Repository
public interface PresupuestoRepository extends JpaRepository <Presupuesto, Long>{
    
}
