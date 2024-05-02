package com.finanzify.back.service;

import com.finanzify.back.dto.Balance;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Ingreso;
import com.finanzify.back.repository.EgresoRepository;
import com.finanzify.back.repository.IngresoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceService {

    @Autowired
    private EgresoRepository egresoRepository;

    @Autowired
    private IngresoRepository ingresoRepository;

    public Balance getBalance(String correo) {
        List<Ingreso> ingresos = ingresoRepository.findByUsuario(correo);
        List<Egreso> egresos = egresoRepository.findByUsuario(correo);

        int total_ingresos = 0;
        int total_egresos = 0;

        for (Ingreso ingreso : ingresos) {
            total_ingresos += ingreso.getCantidad();
        }

        for (Egreso egreso : egresos) {
            total_egresos += egreso.getCantidad();
        }

        Balance balance = new Balance();
        balance.setEgresos(total_egresos);
        balance.setIngresos(total_ingresos);
        balance.generarAhorros();

        return balance;
    }
}
