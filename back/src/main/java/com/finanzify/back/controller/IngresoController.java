package com.finanzify.back.controller;

import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Ingreso;
import com.finanzify.back.service.IngresoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/ingresos")
public class IngresoController {

    @Autowired
    private IngresoService ingresoService;

    @PostMapping("/findByUsuario")
    public ResponseEntity<List<Ingreso>> findByUsuario(@RequestBody UserDTO usuario) {
        return ResponseEntity.ok(ingresoService.getIngresosByCorreo(usuario.getCorreo()));
    }

    @PostMapping("/findByUsuario/recent")
    public ResponseEntity<List<Ingreso>> findByUsuarioRecent(@RequestBody UserDTO usuario) {
        return ResponseEntity.ok(ingresoService.getIngresosByCorreo(usuario.getCorreo()));
    }
}
