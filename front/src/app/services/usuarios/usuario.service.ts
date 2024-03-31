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
    return this.http.post<string>(this.url+"/login", { correo, contrasena }, { responseType: 'text' as 'json' });
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
}
