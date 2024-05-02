package com.finanzify.back.controller;

import com.finanzify.back.dto.Movimiento;
import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.service.MovimientoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/movimiento")
public class MovimientoController {

    @Autowired
    private MovimientoServicio movimientoServicio;

    @PostMapping("/recientes")
    public ResponseEntity<List<Movimiento>> recientes(@RequestBody UserDTO usuario) {
        return ResponseEntity.ok(movimientoServicio.getMovimientosRecientes(usuario.getCorreo()));
    }
}
