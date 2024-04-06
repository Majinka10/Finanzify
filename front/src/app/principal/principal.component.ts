import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  
  constructor(
    public usuarioService : UsuarioService,
    private router: Router
    ){}

  salir(){
    this.usuarioService.logout()
    this.router.navigate(['/ingreso'])
  }

}
