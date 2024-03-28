package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.tipo_periodo;

@Repository
public interface tipo_periodoRepository extends JpaRepository<tipo_periodo, Integer>{
    
}
