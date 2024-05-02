package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Egreso;

import java.util.List;

@Repository
public interface EgresoRepository extends JpaRepository<Egreso, Long>{

    @Query(
            value = "SELECT * FROM egreso " +
                    "WHERE usuario = ?1",
            nativeQuery = true
    )
    List<Egreso> findByUsuario(String usuario);

    @Query(
            value = "SELECT * FROM egreso " +
                    "WHERE usuario = ?1 " +
                    "ORDER BY fecha DESC " +
                    "LIMIT 5",
            nativeQuery = true
    )
    List<Egreso> findByUsuarioRecent(String usuario);
}
