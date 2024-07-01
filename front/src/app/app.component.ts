import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './services/usuarios/usuario.service';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './pages/home/footer/footer.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


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
       SidebarComponent]
})
export class AppComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events.subscribe(() => {
      this.updateLayout();
    });
  }

  updateLayout() {
    if (this.router.url.includes('/dashboard')) {
      this.showHeader = false;
      this.showFooter = false;
    } else {
      this.showHeader = true;
      this.showFooter = true;
    }
  }
}

