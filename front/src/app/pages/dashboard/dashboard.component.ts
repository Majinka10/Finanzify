import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { MovimientosRecientesComponent } from '../../components/movimientos-recientes/movimientos-recientes.component';
import { DistribucionGastosComponent } from '../../components/distribucion-gastos/distribucion-gastos.component';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosVersusIngresosComponent } from '../../components/gastos-versus-ingresos/gastos-versus-ingresos.component';
import { HeaderInternoComponent } from '../../components/header-interno/header-interno.component';
import { BalanceComponent } from './balance/balance.component';
import { RegistrarIngresoComponent } from './registrar-ingreso/registrar-ingreso.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GastosVersusIngresosComponent, RegistrarGastoComponent, RegistrarIngresoComponent, BalanceComponent,HeaderInternoComponent,MovimientosRecientesComponent, DistribucionGastosComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(
    public usuarioService : UsuarioService,
    private router: Router
    ){}

  usuario: any;
  usuarioCargado: boolean = false; // Variable para controlar si el usuario ha sido cargado

  ngOnInit(){
    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true; // Indicar que el usuario ha sido cargado correctamente
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }

    if(!this.usuarioService.isLogueado()){
      console.log("No se ha iniciado sesion");
      // window.alert("No se ha iniciado sesion");
      this.router.navigate(['/']);
    }
  }
  
}
