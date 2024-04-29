import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovimientosRecientesComponent } from '../../components/movimientos-recientes/movimientos-recientes.component';
import { DistribucionGastosComponent } from '../../components/distribucion-gastos/distribucion-gastos.component';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, MovimientosRecientesComponent, DistribucionGastosComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(
    public usuarioService : UsuarioService,
    private router: Router
    ){}

  usuario: any;

  ngOnInit(){
    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }

    if(!this.usuarioService.isLogueado()){
      console.log("No se ha iniciado sesion");
      window.alert("No se ha iniciado sesion");
      this.router.navigate(['/']);
    }
  }
  
}
