import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
// import { InvestmentService, Inversion } from '../services/investment.service';
import { InversionService, Inversion } from '../../../services/inversiones/inversion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investments-chart',
  standalone: true,
  templateUrl: './investments-chart.component.html',
//   styleUrls: ['./investments-chart.component.css'],
  imports: [BaseChartDirective, CommonModule]
})
export class InvestmentsChartComponent implements OnInit, OnDestroy {
  inversiones: Inversion[] = [];
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Inversiones',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  private subscription: Subscription;
  usuario: any;
  usuarioCargado: boolean = false;
  loading: boolean = false;

  constructor(private investmentService: InversionService,
    private usuarioService: UsuarioService
  ) {
    this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
      this.actualizarInvestmentsChart();
    });
  }

  ngOnInit(): void {

    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true;

          this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
            this.inversiones = inversiones;
            this.updateChartData();
            this.loading = true;
          });
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } 
  }

  actualizarInvestmentsChart(){
    this.loading = false;
    this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
      this.inversiones = inversiones;
      this.updateChartData();
      this.loading = true;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  updateChartData(): void {
    this.chartData.labels = this.inversiones.map(inv => inv.descripcion);
    this.chartData.datasets[0].data = this.inversiones.map(inv => inv.rendimiento);
  }
}
