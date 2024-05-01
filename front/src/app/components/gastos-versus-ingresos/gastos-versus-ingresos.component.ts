import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gastos-versus-ingresos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './gastos-versus-ingresos.component.html',
  styleUrl: './gastos-versus-ingresos.component.css'
})
export class GastosVersusIngresosComponent {
  data: ChartData<'line'> = {
    labels: this.getLabels(),
    datasets: [
      {
        data: this.getIngresos(), label: 'Ingresos'
      },
      {
        data: this.getGastos(), label: 'Gastos'
      }
    ]
  }

  getLabels(): string[]{
    var labels = [];
    for (var i=0; i < 31; i++){
      labels.push((i + 1).toString());
    }
    return labels;
  }

  getIngresos() {
    return [35000, 22000, 18000, 28000, 1500, 4000, 5000, 8000, 3000, 32000, 20000, 28000];
  }
  
  getGastos() {
    return [32000, 21000, 17000, 31000, 2500, 3500, 4500, 7000, 2200, 28000, 19000, 26000];
  }

}
