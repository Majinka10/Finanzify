package com.finanzify.back.controller;

import com.finanzify.back.dto.Entrada;
import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Ingreso;
import com.finanzify.back.service.EgresoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/egresos")
public class EgresoController {

    @Autowired
    private EgresoService egresoService;

    @PostMapping("/findByUsuario")
    public ResponseEntity<List<Egreso>> findByUsuario(@RequestBody UserDTO usuario) {
        return ResponseEntity.ok(egresoService.getEgresosByCorreo(usuario.getCorreo()));
    }

    @PostMapping("/findByUsuario/recent")
    public ResponseEntity<List<Egreso>> findByUsuarioRecent(@RequestBody UserDTO usuario) {
        return ResponseEntity.ok(egresoService.getEgresosByCorreoRecent(usuario.getCorreo()));
    }

    @PostMapping("/registro")
    public ResponseEntity<Egreso> registro(@RequestBody Entrada entrada) {
        Egreso egreso = egresoService.registrarEgreso(entrada);
        return ResponseEntity.ok(egreso);
    }

}
