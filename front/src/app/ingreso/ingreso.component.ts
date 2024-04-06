import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuarios/usuario.service'
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {

  constructor(
    private usuarioService : UsuarioService,
    private router: Router
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
        this.mensage = "";
        this.mostrar_mensaje = false;
        this.usuarioService.ingreso(this.correo)
        this.router.navigate(['/principal']);

        this.correo = "";
      },
      error => {
        this.mostrar_mensaje = true;
        if (error.status === 401 || error.status == 404) {
          this.mensage = error.error;
        } else {
          this.mensage = 'Error inesperado';
        }
      }
    );
  }
}
