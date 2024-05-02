package com.finanzify.back.dto;


public class Balance {
    private int ingresos;

    private int egresos;

    private int ahorros;

    public int getIngresos() {
        return ingresos;
    }

    public void setIngresos(int ingresos) {
        this.ingresos = ingresos;
    }

    public int getAhorros() {
        return ahorros;
    }

    public void setAhorros(int ahorros) {
        this.ahorros = ahorros;
    }

    public int getEgresos() {
        return egresos;
    }

    public void setEgresos(int egresos) {
        this.egresos = egresos;
    }

    public void generarAhorros(){
        this.ahorros = this.ingresos - this.egresos;
    }
}
