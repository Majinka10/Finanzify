package com.finanzify.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.model.Usuario;
import com.finanzify.back.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository repo;

    public List<Usuario> getUsuarios(){
        return repo.findAll();
    }

    public Usuario registroUsuario(Usuario user){
        return repo.save(user);
    }

}
