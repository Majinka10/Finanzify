import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuarios/usuario.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  
  constructor(public usuarioService : UsuarioService){}

  salir(){
    this.usuarioService.logout()
  }

}
