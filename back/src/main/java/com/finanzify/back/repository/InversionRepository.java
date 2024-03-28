package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Inversion;

@Repository
public interface InversionRepository extends JpaRepository<Inversion, Long>{
    
}
