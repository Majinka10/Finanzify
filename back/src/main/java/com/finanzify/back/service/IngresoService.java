package com.finanzify.back.service;

import com.finanzify.back.dto.Entrada;
import com.finanzify.back.dto.SalidaDay;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Ingreso;
import com.finanzify.back.model.Usuario;
import com.finanzify.back.model.tipo_ingreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.IngresoRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class IngresoService {
    
    @Autowired
    private IngresoRepository repo;

    public List<Ingreso> getIngresosByCorreo(String correo) {
        return repo.findByUsuario(correo);
    }

    public List<Ingreso> getIngresosByCorreoRecent(String correo) {

        return repo.findByUsuarioRecent(correo);
    }

    public void insertIngreso(Ingreso ingreso) {
        repo.save(ingreso);
    }

    public Ingreso registrarIngreso(Entrada entrada) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date fecha = null;
        try {
            fecha = dateFormat.parse(entrada.getFecha());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(entrada.getUsuario());

        tipo_ingreso tipo = new tipo_ingreso();
        tipo.setId(entrada.getTipo());

        Ingreso ingreso = new Ingreso();
        ingreso.setCantidad(entrada.getCantidad());
        ingreso.setDescripcion(entrada.getDescripcion());
        ingreso.setFecha(fecha);
        ingreso.setUsuario(usuario);
        ingreso.setTipo(tipo);

        return repo.save(ingreso);
    }

    public List<Ingreso> getIngresosByCorreoThisMonth(String correo) {
        return repo.findAllThisMonth(correo);
    }

    public List<SalidaDay> getIngresosByCorreoThisMonthEveryDay(String correo) {
        List<SalidaDay> salidas = new ArrayList<>();
        List<Ingreso> ingresos = getIngresosByCorreoThisMonth(correo);

        Calendar calendar = Calendar.getInstance();
        int today = calendar.get(Calendar.DAY_OF_MONTH);

        for(int i = 1; i <= today; i++){
            SalidaDay salida = new SalidaDay();
            salida.setDia(i);
            salida.setCantidad(0);
            for(Ingreso ingreso : ingresos){
                Date fecha = ingreso.getFecha();
                Calendar calendarForToday = Calendar.getInstance();
                calendarForToday.setTime(fecha);
                int numeroDia = calendarForToday.get(Calendar.DAY_OF_MONTH);
                if(numeroDia == i){
                    salida.setCantidad(salida.getCantidad() + ingreso.getCantidad());
                }
            }
            salidas.add(salida);
        }

        return salidas;
    }
}
