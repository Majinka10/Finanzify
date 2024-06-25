import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { IngresoService } from '../../services/ingreso/ingreso.service';
import { EgresoService } from '../../services/egreso/egreso.service';
import { Subscription, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos-versus-ingresos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './gastos-versus-ingresos.component.html',
  styleUrl: './gastos-versus-ingresos.component.css'
})
export class GastosVersusIngresosComponent implements OnInit{

  private subscription: Subscription;

  public cargoData: boolean = true;

  constructor(
    public usuarioService : UsuarioService,
    public ingresoService : IngresoService,
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
          this.ingresoService.getIngresosThisMonthEveryDay(usuario),
          this.egresoService.getEgresosThisMonthEveryDay(usuario)
        ]).subscribe(([ingresos, egresos]) => {
          const labels = (ingresos as any[]).map(ingreso => ingreso.dia.toString());
          const datosIngresos = (ingresos as any[]).map(ingreso => ingreso.cantidad);
          const datosEgresos = (egresos as any[]).map(egreso => egreso.cantidad);

          this.data = {
            labels: labels,
            datasets: [
              { data: datosIngresos, label: 'Ingresos' },
              { data: datosEgresos, label: 'Gastos' }
            ]
          };
          this.cargoData = true;
        });
      });
    }
  }
}
