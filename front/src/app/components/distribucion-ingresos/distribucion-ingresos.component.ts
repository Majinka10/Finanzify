import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { IngresoService } from '../../services/ingreso/ingreso.service';

@Component({
  selector: 'app-distribucion-ingresos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './distribucion-ingresos.component.html',
  // styleUrls: ['./distribucion-ingresos.component.css']
})
export class DistribucionIngresosComponent implements OnInit {
  data: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Ingresos por categoría' }
    ]
  };

  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private egresoService: IngresoService
  ) {}

  ngOnInit() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    if (this.usuarioService.isLogueado()) {
      this.loading = false;
      this.usuarioService.getUsuario().subscribe(usuario => {
        this.egresoService.getIngresosThisMonthEveryDayType(usuario).subscribe(ingresoPorTipo => {
          const labels = (ingresoPorTipo as any[]).map(egreso => egreso.tipo);
          const datos = (ingresoPorTipo as any[]).map(egreso => egreso.cantidad);

          this.data.labels = labels;
          this.data.datasets[0].data = datos;
          this.loading = true;
        });
      });
    }
  }
}
