import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoComponent } from './ingreso/ingreso.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioService } from './services/usuarios/usuario.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, IngresoComponent, PrincipalComponent]
})
export class AppComponent {
  title = 'Ingreso';

  constructor(public usuarioService : UsuarioService){}

}

