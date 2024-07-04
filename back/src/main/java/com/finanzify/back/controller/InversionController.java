package com.finanzify.back.controller;

import com.finanzify.back.dto.InversionDTO;
import com.finanzify.back.mappers.InversionMapper;
import com.finanzify.back.model.Inversion;
import com.finanzify.back.service.InversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/inversion")
public class InversionController {

    @Autowired
    private InversionService inversionService;

    @GetMapping("/usuario/{usuario}")
    public List<InversionDTO> getInversiones(@PathVariable String usuario) {
        List<Inversion> inversiones = inversionService.getInversionesUsuario(usuario);
        List<InversionDTO> inversionesDTO = inversiones.stream()
                .map(InversionMapper.INSTANCE::inversionToInversionDto)
                .collect(Collectors.toList());
        return inversionesDTO;
    }

    @GetMapping("/all")
    public List<Inversion> getAllInversiones() {
        List<Inversion> inversiones = inversionService.getAllInversiones();
        return inversiones;
    }

    @PostMapping("/registro")
    public Inversion registro(
            @RequestBody Inversion inversion
    ) {
        return inversionService.registrarInversion(inversion);
    }

}
