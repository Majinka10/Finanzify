package com.finanzify.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finanzify.back.model.Usuario;
import com.finanzify.back.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> getUsuarios(){
        return repo.findAll();
    }

    public Boolean validarContrasena(String correo, String contrasena){
        Usuario user = findByCorreo(correo);
        if(user == null){
            return false;
        }else if (user.getContrasena().equals(contrasena)){
            return true;
        }else{
            return false;
        }
    }

    public Usuario registroUsuario(Usuario user){
        /*encriptando contraseña */
        String contrasena_code = passwordEncoder.encode(user.getContrasena());
        user.setContrasena(contrasena_code);
        
        return repo.save(user);
    }

    public Usuario findByCorreo(String correo){
        Optional<Usuario> optionalUsuario = repo.findById(correo);
        return optionalUsuario.orElse(null);
    }

}
