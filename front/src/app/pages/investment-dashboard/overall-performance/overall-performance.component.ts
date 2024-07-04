import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InversionService } from '../../../services/inversiones/inversion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';

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

  constructor(
    private investmentService: InversionService,
    public usuarioService : UsuarioService
  ) {}

  usuario: any;
  usuarioCargado: boolean = false;

  ngOnInit(): void {
    
    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true; 

          this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {

            console.log('Inversiones:', inversiones);

            const labels = inversiones.map(inv => {
              const fecha = typeof inv.fecha === 'string' ? new Date(inv.fecha) : inv.fecha;
              
              if (fecha instanceof Date && !isNaN(fecha.getTime())) {
                return fecha.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              } else {
                return 'N/A';
              }
            });
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
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }
}
