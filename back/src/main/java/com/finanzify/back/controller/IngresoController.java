package com.finanzify.back.controller;

import com.finanzify.back.dto.Entrada;
import com.finanzify.back.dto.SalidaDay;
import com.finanzify.back.dto.UserDTO;
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
        return ResponseEntity.ok(ingresoService.getIngresosByCorreoRecent(usuario.getCorreo()));
    }

    @PostMapping("/registro")
    public ResponseEntity<Ingreso> registro(@RequestBody Entrada entrada) {
        Ingreso ingreso = ingresoService.registrarIngreso(entrada);
        return ResponseEntity.ok(ingreso);
    }
    @GetMapping("/thisMonth/{correo}")
    public ResponseEntity<List<Ingreso>> findByMonth(@PathVariable String correo) {
        return ResponseEntity.ok(ingresoService.getIngresosByCorreoThisMonth(correo));
    }

    @GetMapping("/thisMonth/everyDay/{correo}")
    public ResponseEntity<List<SalidaDay>> findByMonthEveryDay(@PathVariable String correo) {
        return ResponseEntity.ok(ingresoService.getIngresosByCorreoThisMonthEveryDay(correo));
    }

}
