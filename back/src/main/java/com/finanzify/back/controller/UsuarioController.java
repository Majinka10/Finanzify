package com.finanzify.back.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzify.back.model.Usuario;
import com.finanzify.back.service.UsuarioService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping
    public ResponseEntity<List<Usuario>> getuUsuarios(){
        return ResponseEntity.ok(usuarioService.getUsuarios());
    }

    @PostMapping
    public ResponseEntity<Usuario> ingresoUsuario(@RequestBody Usuario user){
        return ResponseEntity.ok(usuarioService.ingresousUsuario(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(@RequestBody Map<String, String> respuesta){

        String correo = respuesta.get("correo");
        String contrasena = respuesta.get("contrasena");

        List<Usuario> usuarios = usuarioService.getUsuarios();

        for(Usuario usuario : usuarios){
            if(correo.equals(usuario.getCorreo())){
                /*
                Aqui agregaremos HASH CODE 
                */
                if(contrasena.equals(usuario.getContrasena())){
                    return ResponseEntity.ok("Acceso concedido");
                }else{
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
                }
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        
    }
}
