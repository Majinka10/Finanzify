import { Component, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { MovimientosRecientesComponent } from '../../components/movimientos-recientes/movimientos-recientes.component';
import { DistribucionGastosComponent } from '../../components/distribucion-gastos/distribucion-gastos.component';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosVersusIngresosComponent } from '../../components/gastos-versus-ingresos/gastos-versus-ingresos.component';
import { HeaderInternoComponent } from '../../components/header-interno/header-interno.component';
// import { BalanceComponent } from './balance/balance.component';
import { RegistrarIngresoComponent } from './registrar-ingreso/registrar-ingreso.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { BalanceService } from '../../services/balance/balance.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GastosVersusIngresosComponent, RegistrarGastoComponent, RegistrarIngresoComponent,  HeaderInternoComponent,MovimientosRecientesComponent, DistribucionGastosComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{

  private subscription: Subscription;

  constructor(
    public usuarioService : UsuarioService,
    private router: Router,
    public balanceService: BalanceService
    ){
      this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
        this.actualizarDashboard();
      });
    }

  usuario: any;
  usuarioCargado: boolean = false; // Variable para controlar si el usuario ha sido cargado

  balance: any = {
    ingresos: 0,
    egresos: 0,
    ahorros: 0
  };

  ngOnInit(){
    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true; // Indicar que el usuario ha sido cargado correctamente

          // Obtener el balance del usuario
          this.balanceService.getBalance(this.usuario).subscribe(
            balance => {
              this.balance = balance;
            },
            error => {
              console.error('Error al obtener el balance:', error);
            }
          );

        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }

    if(!this.usuarioService.isLogueado()){
      // console.log("No se ha iniciado sesion");
      window.alert("No se ha iniciado sesion");
      this.router.navigate(['/']);
    }
  }

  actualizarDashboard(){
    this.balanceService.getBalance(this.usuario).subscribe(
      balance => {
        this.balance = balance;
      },
      error => {
        console.error('Error al obtener el balance:', error);
      }
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
