package com.finanzify.back.service;

import com.finanzify.back.dto.Entrada;
import com.finanzify.back.dto.SalidaDay;
import com.finanzify.back.dto.SalidaDayType;
import com.finanzify.back.model.Egreso;
import com.finanzify.back.model.Ingreso;
import com.finanzify.back.model.Usuario;
import com.finanzify.back.model.tipo_egreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzify.back.repository.EgresoRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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

    public List<Egreso> getEgresosByCorreoThisMonth(String correo) {
        return repo.findAllThisMonth(correo);
    }

    public List<SalidaDay> getEgresosByCorreoThisMonthEveryDay(String correo) {
        List<SalidaDay> salidas = new ArrayList<>();
        List<Egreso> egresos = getEgresosByCorreoThisMonth(correo);

        Calendar calendar = Calendar.getInstance();
        int today = calendar.get(Calendar.DAY_OF_MONTH);

        for(int i = 1; i <= today; i++){
            SalidaDay salida = new SalidaDay();
            salida.setDia(i);
            salida.setCantidad(0);
            for(Egreso egreso : egresos){
                Date fecha = egreso.getFecha();
                Calendar calendarForToday = Calendar.getInstance();
                calendarForToday.setTime(fecha);
                int numeroDia = calendarForToday.get(Calendar.DAY_OF_MONTH);
                if(numeroDia == i){
                    salida.setCantidad(salida.getCantidad() + egreso.getCantidad());
                }
            }
            salidas.add(salida);
        }

        return salidas;
    }

    public List<SalidaDayType> getEgresosByCorreoThisMonthEveryDayType(String correo) {
        List<SalidaDayType> salidas = new ArrayList<>();
        List<Egreso> egresos = getEgresosByCorreoThisMonth(correo);
        List<String> tipos = new ArrayList<>();

        for(Egreso egreso : egresos){
            if(!tipos.contains(egreso.getTipo().getNombre())){
                tipos.add(egreso.getTipo().getNombre());
            }
        }

        for(String tipo : tipos){
            SalidaDayType salida = new SalidaDayType();
            salida.setTipo(tipo);
            salida.setCantidad(0);
            for(Egreso egreso : egresos){
                if(egreso.getTipo().getNombre().equals(tipo)){
                    salida.setCantidad(egreso.getCantidad()+salida.getCantidad());
                }
            }
            salidas.add(salida);
        }

        return salidas;
    }
}
