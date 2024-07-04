import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InversionService } from '../../../services/inversiones/inversion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overall-performance',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './overall-performance.component.html'
})
export class OverallPerformanceComponent implements OnInit, OnDestroy {
  data: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
  currentValue: number = 0;
  investedValue: number = 0;
  performanceText: string = '';
  performanceClass: string = 'text-secondary';

  private subscription: Subscription;

  constructor(
    private investmentService: InversionService,
    public usuarioService : UsuarioService
  ) {
    this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
      this.actualizarOverallPerformance();
    });
  }

  usuario: any;
  usuarioCargado: boolean = false;

  ngOnInit(): void { 
    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true;

          this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
            const labels = inversiones.map(inv => {
              const fecha = typeof inv.fecha === 'string' ? new Date(inv.fecha) : inv.fecha;
              
              if (fecha instanceof Date && !isNaN(fecha.getTime())) {
                return fecha.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              } else {
                return 'N/A';
              }
            });
            const rendimientos = inversiones.map(inv => inv.rendimiento);
            const rendimientosAcumulados = this.getRendimientosAcumulados(rendimientos);
            
            this.currentValue = rendimientosAcumulados[rendimientosAcumulados.length - 1] || 0;
            this.investedValue = inversiones.reduce((sum, inv) => sum + inv.cantidad, 0);
      
            const previousMonthValue = rendimientosAcumulados[rendimientosAcumulados.length - 2] || 0;
            const performanceChange = ((this.currentValue - previousMonthValue) / previousMonthValue) * 100;
      
            if (performanceChange > 0) {
              this.performanceText = `↑ ${performanceChange.toFixed(2)}% from last month`;
              this.performanceClass = 'text-success';
            } else if (performanceChange < 0) {
              this.performanceText = `↓ ${performanceChange.toFixed(2)}% from last month`;
              this.performanceClass = 'text-danger';
            } else {
              this.performanceText = `↔ ${performanceChange.toFixed(2)}% from last month`;
              this.performanceClass = 'text-secondary';
            }
      
            this.data = {
              labels: labels,
              datasets: [
                {
                  label: 'Overall Performance',
                  data: rendimientosAcumulados,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)'
                }
              ]
            };
          });
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  getRendimientosAcumulados(rendimientos: number[]): number[] {
    let acumulado = 0;
    return rendimientos.map(rendimiento => acumulado += rendimiento);
  }

  actualizarOverallPerformance(){
    this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
      const labels = inversiones.map(inv => {
        const fecha = typeof inv.fecha === 'string' ? new Date(inv.fecha) : inv.fecha;
        
        if (fecha instanceof Date && !isNaN(fecha.getTime())) {
          return fecha.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } else {
          return 'N/A';
        }
      });
      const rendimientos = inversiones.map(inv => inv.rendimiento);
      const rendimientosAcumulados = this.getRendimientosAcumulados(rendimientos);
      
      this.currentValue = rendimientosAcumulados[rendimientosAcumulados.length - 1] || 0;
      this.investedValue = inversiones.reduce((sum, inv) => sum + inv.cantidad, 0);

      const previousMonthValue = rendimientosAcumulados[rendimientosAcumulados.length - 2] || 0;
      const performanceChange = ((this.currentValue - previousMonthValue) / previousMonthValue) * 100;

      if (performanceChange > 0) {
        this.performanceText = `↑ ${performanceChange.toFixed(2)}% from last month`;
        this.performanceClass = 'text-success';
      } else if (performanceChange < 0) {
        this.performanceText = `↓ ${performanceChange.toFixed(2)}% from last month`;
        this.performanceClass = 'text-danger';
      } else {
        this.performanceText = `↔ ${performanceChange.toFixed(2)}% from last month`;
        this.performanceClass = 'text-secondary';
      }

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Overall Performance',
            data: rendimientosAcumulados,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
          }
        ]
      };
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
