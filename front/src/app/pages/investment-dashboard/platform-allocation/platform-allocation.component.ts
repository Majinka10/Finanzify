import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InversionService } from '../../../services/inversiones/inversion.service';

@Component({
  selector: 'app-platform-allocation',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './platform-allocation.component.html',
  // styleUrls: ['./platform-allocation.component.css']
})
export class PlatformAllocationComponent implements OnInit {
  data: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  constructor(private investmentService: InversionService) {}

  ngOnInit(): void {
    this.investmentService.getInversiones().subscribe(inversiones => {
      const platformGroups = inversiones.reduce((acc, inv) => {
        if (!acc[inv.tipo]) acc[inv.tipo] = 0;
        acc[inv.tipo] += inv.rendimiento;
        return acc;
      }, {} as Record<string, number>);

      const labels = Object.keys(platformGroups);
      const data = Object.values(platformGroups);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Platform Allocation',
            data: data,
            backgroundColor: ['#36a2eb', '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0']
          }
        ]
      };
    });
  }
}
