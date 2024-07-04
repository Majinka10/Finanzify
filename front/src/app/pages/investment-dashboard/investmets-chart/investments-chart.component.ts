import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
// import { InvestmentService, Inversion } from '../services/investment.service';
import { InversionService, Inversion } from '../../../services/inversiones/inversion.service';

@Component({
  selector: 'app-investments-chart',
  standalone: true,
  templateUrl: './investments-chart.component.html',
//   styleUrls: ['./investments-chart.component.css'],
  imports: [BaseChartDirective, CommonModule]
})
export class InvestmentsChartComponent implements OnInit {
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

  constructor(private investmentService: InversionService) {}

  ngOnInit(): void {
    this.investmentService.getInversiones().subscribe(inversiones => {
      this.inversiones = inversiones;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.chartData.labels = this.inversiones.map(inv => inv.descripcion);
    this.chartData.datasets[0].data = this.inversiones.map(inv => inv.rendimiento);
  }
}
