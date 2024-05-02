package com.finanzify.back.repository;

import com.finanzify.back.model.Egreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Ingreso;

import java.util.List;

@Repository
public interface IngresoRepository extends JpaRepository<Ingreso, Long>{
    @Query(
            value = "SELECT * FROM ingreso " +
                    "WHERE usuario = ?1",
            nativeQuery = true
    )
    List<Ingreso> findByUsuario(String usuario);

    @Query(
            value = "SELECT * FROM ingreso " +
                    "WHERE usuario = ?1 " +
                    "ORDER BY fecha DESC " +
                    "LIMIT 5",
            nativeQuery = true
    )
    List<Ingreso> findByUsuarioRecent(String usuario);
}
