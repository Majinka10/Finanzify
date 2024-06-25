package com.finanzify.back.controller;

import java.util.List;
import java.util.Map;

import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.mappers.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.finanzify.back.model.Usuario;
import com.finanzify.back.service.UsuarioService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private ProjectInfoAutoConfiguration projectInfoAutoConfiguration;

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

    @GetMapping("/userByCorreo")
    public ResponseEntity<UserDTO> usuarioByCorreo(@RequestParam String correo){
        Usuario u = usuarioService.findByCorreo(correo);
        UserDTO dto = UsuarioMapper.INSTANCE.usuarioToUsuarioDTO(u);
        return ResponseEntity.ok(dto);
    }
}
