package com.finanzify.back.controller;

import com.finanzify.back.dto.TipoDTO;
import com.finanzify.back.mappers.TipoMapper;
import com.finanzify.back.service.tipo_egresoService;
import com.finanzify.back.service.tipo_ingresoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tipo")
public class TipoController {

    @Autowired
    private tipo_egresoService tipoEgresoService;

    @Autowired
    private tipo_ingresoService tipoIngresoService;

    @GetMapping("/egreso")
    public ResponseEntity<List<TipoDTO>> getTipoEgreso() {
        var tipoEgresos = this.tipoEgresoService.getAll();
        var tipos = tipoEgresos.stream().map(p->TipoMapper.INSTANCE.tipoEgresoToTipoDto(p)).collect(Collectors.toList());

        return ResponseEntity.ok(tipos);
    }

    @GetMapping("/ingreso")
    public ResponseEntity<List<TipoDTO>> getTipoIngreso() {
        var tipoIngresos = this.tipoIngresoService.getAll();
        var tipos = tipoIngresos.stream().map(p->TipoMapper.INSTANCE.tipoIngresoToTipoDto(p)).collect(Collectors.toList());

        return ResponseEntity.ok(tipos);
    }
}
