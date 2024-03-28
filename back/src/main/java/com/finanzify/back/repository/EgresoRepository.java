package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Egreso;

@Repository
public interface EgresoRepository extends JpaRepository<Egreso, Long>{
    
}
