package com.finanzify.back.service;

import com.finanzify.back.dto.Movimiento;
import com.finanzify.back.dto.TipoDTO;
import com.finanzify.back.mappers.TipoMapper;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Ingreso;
import com.finanzify.back.repository.EgresoRepository;
import com.finanzify.back.repository.IngresoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class MovimientoServicio {

    @Autowired
    private IngresoRepository ingresoRepository;

    @Autowired
    private EgresoRepository egresoRepository;

    public List<Movimiento> getMovimientosRecientes(String correo) {
        List<Egreso> egresos = egresoRepository.findByUsuarioRecent(correo);
        List<Ingreso> ingresos = ingresoRepository.findByUsuarioRecent(correo);

        List<Movimiento> movimientos = new ArrayList<>();

        //agregando los 5 egresos mas recientes
        for (Egreso egreso : egresos) {
            TipoDTO tipo = TipoMapper.INSTANCE.tipoEgresoToTipoDto(egreso.getTipo());
            Movimiento movimiento = new Movimiento();

            movimiento.setTipo(tipo);
            movimiento.setSubtipo("egreso");
            movimiento.setCantidad(egreso.getCantidad());
            movimiento.setFecha(egreso.getFecha());
            movimiento.setDescripcion(egreso.getDescripcion());

            movimientos.add(movimiento);
        }

        //agregnado los 5 ingresos mas recientes
        for (Ingreso ingreso : ingresos) {
            TipoDTO tipo = TipoMapper.INSTANCE.tipoIngresoToTipoDto(ingreso.getTipo());
            Movimiento movimiento = new Movimiento();

            movimiento.setTipo(tipo);
            movimiento.setSubtipo("ingreso");
            movimiento.setCantidad(ingreso.getCantidad());
            movimiento.setFecha(ingreso.getFecha());
            movimiento.setDescripcion(ingreso.getDescripcion());
            movimientos.add(movimiento);
        }

        //Ordena la lista de movimientos
        Collections.sort(movimientos, Comparator.comparing(Movimiento::getFecha).reversed());

        return movimientos;
    }
}
