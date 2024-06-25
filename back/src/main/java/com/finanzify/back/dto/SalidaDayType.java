package com.finanzify.back.dto;

public class SalidaDayType {
    private int cantidad;
    private String tipo;

    public SalidaDayType() {}

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
