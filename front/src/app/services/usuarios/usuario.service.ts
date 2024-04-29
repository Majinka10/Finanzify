import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  usuario : any;
  usuarioLogueado = false;
  usuario_activo = '';

  url = "http://localhost:8080/usuarios";

  login(correo : string, contrasena :  string){
    return this.http.post<string>(this.url+"/ingreso", { correo, contrasena }, { responseType: 'text' as 'json' });
  }

  ingreso(user : string){
    this.usuario_activo = user;
    this.http.get(this.url+"/userByCorreo?correo="+user).subscribe(
      (response) => {
        this.usuario = response;
    });
    this.usuarioLogueado = true;
  }

  logout(){
    this.usuarioLogueado = false;
    this.usuario_activo = '';
    this.usuario = null
  }

  isLogueado(){
    return this.usuarioLogueado;
  }

  registro(nombre: string, correo: string, contrasena:string){
    return this.http.post<string>(this.url+"/registro", { nombre, correo, contrasena }, { responseType: 'text' as 'json' });
  }

  getUsuario(){
    return this.http.get(this.url+"/userByCorreo?correo="+this.usuario_activo);
  }

}
