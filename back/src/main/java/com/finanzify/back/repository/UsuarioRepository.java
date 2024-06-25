package com.finanzify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzify.back.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    public Usuario findByCorreo(String correo);
}
