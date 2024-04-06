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

    @PostMapping("/ingreso")
    public ResponseEntity<String> ingresoUsuario(@RequestBody Usuario user){

        String correo = user.getCorreo();
        String contrasena = user.getContrasena();

        Usuario u = usuarioService.findByCorreo(correo);

        if(u == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }else{
            if(usuarioService.validarContrasena(correo, contrasena)){
                return ResponseEntity.ok("Acceso concedido");
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }
        }    
    }


    @PostMapping("/registro")
    public ResponseEntity<String> registroUsuario(@RequestBody Usuario user){
        String nombre = user.getNombre();
        String correo = user.getCorreo();
        String contrasena = user.getContrasena();

        Usuario u = usuarioService.findByCorreo(correo);

        if(u == null){
            Usuario new_usuario = new Usuario();
            new_usuario.setNombre(nombre);
            new_usuario.setCorreo(correo);
            new_usuario.setContrasena(contrasena);
            new_usuario = usuarioService.registroUsuario(new_usuario);
            return ResponseEntity.ok("Usuario creado");
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario ya existente");
        }   
    }
}
