import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  usuarioLogueado = false;
  usuario_activo = '';

  url = "http://localhost:8080/usuarios";

  login(correo : string, contrasena :  string){
    return this.http.post<string>(this.url+"/ingreso", { correo, contrasena }, { responseType: 'text' as 'json' });
  }

  ingreso(user : string){
    this.usuarioLogueado = true;
    this.usuario_activo = user;
  }

  logout(){
    this.usuarioLogueado = false;
  }

  isLogueado(){
    return this.usuarioLogueado;
  }

  registro(nombre: string, correo: string, contrasena:string){
    return this.http.post<string>(this.url+"/registro", { nombre, correo, contrasena }, { responseType: 'text' as 'json' });
  }
}
