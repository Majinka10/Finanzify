import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoComponent } from './ingreso/ingreso.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioService } from './services/usuarios/usuario.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
       CommonModule,
       IngresoComponent,
       PrincipalComponent, 
       RouterOutlet,
       FooterComponent]
})
export class AppComponent {
  title = 'Ingreso';

  constructor(public usuarioService : UsuarioService){}

}

