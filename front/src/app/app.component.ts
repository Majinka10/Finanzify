import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './services/usuarios/usuario.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
       CommonModule, 
       RouterOutlet,
       FooterComponent,
       HeaderComponent,
       RouterLink]
})
export class AppComponent {
  constructor(public usuarioService : UsuarioService){}
}

