import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-distribucion-gastos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './distribucion-gastos.component.html',
  styleUrl: './distribucion-gastos.component.css'
})
export class DistribucionGastosComponent{

  geoChartData: ChartData<'doughnut'> = {
    labels: ['Arriendo', 'Zapatos', 'Recibo de la luz', 'Gastos médicos'],
    datasets: [
      {
        data: this.getGastos()
      }
    ]
  }
  
  getGastos() {
    return [50000, 20000, 5000, 3000];
  }
  
  private data_2 = [
    { title: "Arriendo", fecha: "Marzo 22, 2024", cantidad: 50000, tipo: "Gasto" },
    { title: "Recibo de la luz", fecha: "Marzo 12, 2024", cantidad: 20000, tipo: "Gasto" },
    { title: "Zapatos", fecha: "Marzo 03, 2024", cantidad: 5000, tipo: "Gasto" },
    { title: "Gastos médicos", fecha: "Marzo 01, 2024", cantidad: 3000, tipo: "Gasto" }
  ];
}
