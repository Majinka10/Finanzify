import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovimientosRecientesComponent } from '../../components/movimientos-recientes/movimientos-recientes.component';
import { DistribucionGastosComponent } from '../../components/distribucion-gastos/distribucion-gastos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, MovimientosRecientesComponent, DistribucionGastosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  constructor(
    public usuarioService : UsuarioService,
    private router: Router
    ){}
}
