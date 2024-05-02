import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovimientoService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/movimiento";

  getMovimientosRecientes(usuario:any){
    return this.http.post(this.url+"/recientes",  usuario );
  }
}
