package com.finanzify.back.service;

import com.finanzify.back.dto.Entrada;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Usuario;
import com.finanzify.back.model.tipo_egreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.EgresoRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class EgresoService {
    
    @Autowired
    private EgresoRepository repo;

    public List<Egreso> getEgresosByCorreo(String correo){

        return repo.findByUsuario(correo);
    }

    public List<Egreso> getEgresosByCorreoRecent(String correo){

        return repo.findByUsuarioRecent(correo);
    }

    public Egreso registrarEgreso(Entrada entrada) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date fecha = null;
        try {
            fecha = dateFormat.parse(entrada.getFecha());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(entrada.getUsuario());

        tipo_egreso tipo = new tipo_egreso();
        tipo.setId(entrada.getTipo());

        Egreso egreso = new Egreso();
        egreso.setCantidad(entrada.getCantidad());
        egreso.setDescripcion(entrada.getDescripcion());
        egreso.setFecha(fecha);
        egreso.setUsuario(usuario);
        egreso.setTipo(tipo);

        return repo.save(egreso);
    }
}
