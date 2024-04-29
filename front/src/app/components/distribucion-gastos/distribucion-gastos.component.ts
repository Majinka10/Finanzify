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

  data: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: this.getIngresos(), label: 'Ingresos'
      },
      {
        data: this.getGastos(), label: 'Gastos'
      }
    ]
  }

  getIngresos() {
    return [35000, 22000, 18000, 28000, 1500, 4000, 5000, 8000, 3000, 32000, 20000, 28000];
  }
  
  getGastos() {
    return [32000, 21000, 17000, 31000, 2500, 3500, 4500, 7000, 2200, 28000, 19000, 26000];
  }
  
  private data_2 = [
    { title: "Arriendo", fecha: "Marzo 22, 2024", cantidad: 50000, tipo: "Gasto" },
    { title: "Recibo de la luz", fecha: "Marzo 12, 2024", cantidad: 20000, tipo: "Gasto" },
    { title: "Zapatos", fecha: "Marzo 03, 2024", cantidad: 5000, tipo: "Gasto" },
    { title: "Gastos médicos", fecha: "Marzo 01, 2024", cantidad: 3000, tipo: "Gasto" }
  ];
}
