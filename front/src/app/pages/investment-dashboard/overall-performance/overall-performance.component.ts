import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InversionService } from '../../../services/inversiones/inversion.service';

@Component({
  selector: 'app-overall-performance',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './overall-performance.component.html',
//   styleUrls: ['./overall-performance.component.css']
})
export class OverallPerformanceComponent implements OnInit {
  data: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  constructor(private investmentService: InversionService) {}

  ngOnInit(): void {
    this.investmentService.getInversiones().subscribe(inversiones => {
      const labels = inversiones.map(inv => inv.fecha.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      const data = inversiones.map(inv => inv.rendimiento);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Overall Performance',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
          }
        ]
      };
    });
  }
}
