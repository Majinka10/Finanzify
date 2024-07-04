import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InversionService } from '../../../services/inversiones/inversion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-platform-allocation',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './platform-allocation.component.html',
  // styleUrls: ['./platform-allocation.component.css']
})
export class PlatformAllocationComponent implements OnInit, OnDestroy {
  data: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  private subscription: Subscription;
  usuario: any;
  usuarioCargado: boolean = false;

  constructor(private investmentService: InversionService,
    private usuarioService : UsuarioService
  ) {
    this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
      this.actualizarPlatform();
    });
  }

  ngOnInit(): void {

    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true;

          this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
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
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }

  }

  actualizarPlatform(){
    this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
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

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
