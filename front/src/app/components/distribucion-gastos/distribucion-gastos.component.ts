import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription, forkJoin } from 'rxjs';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { EgresoService } from '../../services/egreso/egreso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distribucion-gastos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './distribucion-gastos.component.html',
  styleUrl: './distribucion-gastos.component.css'
})
export class DistribucionGastosComponent{

  
  private subscription: Subscription;

  public cargoData: boolean = true;

  constructor(
    public usuarioService : UsuarioService,
    public egresoService : EgresoService
    ){
      this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
        this.actualizarDashboard();
      });
    }

  data: ChartData<'line'> = {
    labels: [],
    datasets: []
  }

  ngOnInit(): void{
    this.actualizarDashboard();
  }


  actualizarDashboard() {
    if (this.usuarioService.isLogueado()) {
      this.usuarioService.getUsuario().subscribe(usuario => {
        forkJoin([
          this.egresoService.getEgresosThisMonthEveryDayType(usuario)
        ]).subscribe(([egresos]) => {
          const labels = (egresos as any[]).map(ingreso => ingreso.tipo);
          const datosEgresos = (egresos as any[]).map(egreso => egreso.cantidad);

          this.data = {
            labels: labels,
            datasets: [
              { data: datosEgresos}
            ]
          };
          this.cargoData = true;
        });
      });
    }
  }
}
