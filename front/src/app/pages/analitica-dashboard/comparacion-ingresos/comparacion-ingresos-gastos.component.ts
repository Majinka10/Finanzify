import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { IngresoService } from '../../../services/ingreso/ingreso.service';
import { EgresoService } from '../../../services/egreso/egreso.service';

@Component({
  selector: 'app-comparacion-ingresos-gastos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './comparacion-ingresos-gastos.component.html',
  // styleUrls: ['./comparacion-ingresos-gastos.component.css']
})
export class ComparacionIngresosGastosComponent implements OnInit {
  data: ChartData<'bar'> = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      { data: [], label: 'Cantidad' }
    ]
  };

  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private ingresoService: IngresoService,
    private egresoService: EgresoService
  ) {}

  ngOnInit() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    if (this.usuarioService.isLogueado()) {
      this.loading = false;
      this.usuarioService.getUsuario().subscribe(usuario => {
        forkJoin([
          this.ingresoService.getIngresosThisMonthEveryDay(usuario),
          this.egresoService.getEgresosThisMonthEveryDay(usuario)
        ]).subscribe(([ingresos, egresos]) => {
          const totalIngresos = (ingresos as any[]).reduce((sum, ingreso) => sum + ingreso.cantidad, 0);
          const totalEgresos = (egresos as any[]).reduce((sum, egreso) => sum + egreso.cantidad, 0);

          this.data.datasets[0].data = [totalIngresos, totalEgresos];
          this.loading = true;
        });
      });
    }
  }
}
