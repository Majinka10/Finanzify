package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Inversion;

import java.util.List;

@Repository
public interface InversionRepository extends JpaRepository<Inversion, Long>{

    @Query(
            value = "SELECT * FROM inversion " +
                    "WHERE usuario = ?1 " +
                    "ORDER BY fecha ASC",
            nativeQuery = true
    )
    List<Inversion> findByUsuarioCorreo(String correo);
    
}
