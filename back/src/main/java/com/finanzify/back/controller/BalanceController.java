package com.finanzify.back.controller;

import com.finanzify.back.dto.Balance;
import com.finanzify.back.dto.Movimiento;
import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.service.BalanceService;
import com.finanzify.back.service.MovimientoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/balance")
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @PostMapping("/getBalance")
    public ResponseEntity<Balance> recientes(@RequestBody UserDTO usuario) {
        return ResponseEntity.ok(balanceService.getBalance(usuario.getCorreo()));
    }

}
