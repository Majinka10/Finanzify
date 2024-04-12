import { Component } from '@angular/core';

import { UsuarioService } from '../services/usuarios/usuario.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IngresoComponent } from '../ingreso/ingreso.component';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, IngresoComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(
    private usuarioService : UsuarioService
  ){}

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirm_contrasena:string = '';
  public mensage: string = '';
  public mostrar_mensaje : boolean = false;
  claseAlert: string = 'alert alert-danger flex-grow-1';
  

  registro() {
    if(this.confirm_contrasena != this.contrasena){
      this.claseAlert = 'alert alert-danger flex-grow-1';
      this.mostrar_mensaje = true;
      this.mensage = "Las contraseñas no coinciden"
    }else{
      this.usuarioService.registro(this.nombre, this.correo, this.contrasena)
      .subscribe(
        response => {
          this.claseAlert = 'alert alert-success flex-grow-1';
          this.mostrar_mensaje = true;
          this.nombre = '';
          this.correo = ''
          this.contrasena = '';
          this.confirm_contrasena = '';
          this.mensage = 'Usuario creado con éxito';
        },
        error => {
          this.mostrar_mensaje = true;
          this.claseAlert = 'alert alert-danger flex-grow-1';
          if (error.status === 409) {
            this.mensage = error.error;
          } else {
            this.mensage = 'Error inesperado';
          }
        }
      );
    }
  }
}
