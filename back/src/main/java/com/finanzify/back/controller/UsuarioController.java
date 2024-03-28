package com.finanzify.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzify.back.model.Usuario;
import com.finanzify.back.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping
    public List<Usuario> getuUsuarios(){
        return usuarioService.getUsuarios();
    }

    @PostMapping
    public Usuario ingresoUsuario(@RequestBody Usuario user){
        return usuarioService.ingresousUsuario(user);
    }
}
