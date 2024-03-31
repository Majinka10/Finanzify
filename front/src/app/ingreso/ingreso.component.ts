import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuarios/usuario.service'

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {

  constructor(
    private usuarioService : UsuarioService
  ){}

  correo: string = '';
  contrasena: string = '';
  public mensage: string = '';
  public mostrar_mensaje : boolean = false;
  

  login() {
    this.usuarioService.login(this.correo, this.contrasena)
    .subscribe(
      response => {
        this.contrasena = ""
        this.usuarioService.ingreso(this.correo);
        this.correo = "";
      },
      error => {
        this.mostrar_mensaje = true;
        if (error.status === 401 || error.status == 404) {
          this.mensage = error.error;
        } else {
          this.mensage = 'Error inesperado';
        }
        console.log(this.mensage)
      }
    );
  }
}
