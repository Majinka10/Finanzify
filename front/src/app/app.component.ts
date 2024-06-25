import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './services/usuarios/usuario.service';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './pages/home/footer/footer.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import SpinnerComponent from './components/spinner/spinner.component';


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
       RouterLink,
       RouterModule,
       SidebarComponent,
      SpinnerComponent]
})
export class AppComponent {
  constructor(public usuarioService : UsuarioService,
    private router: Router,
    ){}

  isValid(): boolean {
    if (this.router.url != '/') {
              return false;
      }
    return true;
  }
}

