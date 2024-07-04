import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';
import { InversionService, Inversion } from '../../../services/inversiones/inversion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-value',
  standalone: true,
  templateUrl: './portfolio-value.component.html',
//   styleUrls: ['./portfolio-value.component.css'],
  imports: [CommonModule]
})
export class PortfolioValueComponent implements OnInit, OnDestroy {
  inversiones: Inversion[] = [];
  currentValue: number = 0;
  investedValue: number = 0;
  currentChange: number = 0;
  investedChange: number = 0;
  avgRendimiento: number = 0;
  totalInversiones: number = 0;
  usuario: any;
  usuarioCargado: boolean = false;

  private subscription: Subscription;

  constructor(private investmentService: InversionService,
    private usuarioService: UsuarioService
  ) {
    this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
      this.actualizarPortfolioValue();
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
            this.currentValue = this.investmentService.getCurrentValue(inversiones);
            this.investedValue = this.investmentService.getInvestedValue(inversiones);
            this.currentChange = this.investmentService.getMonthlyChange(inversiones, true);
            this.investedChange = this.investmentService.getMonthlyChange(inversiones, false);
            this.avgRendimiento = this.currentValue / this.inversiones.length;
            this.totalInversiones = this.inversiones.length;
          });
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  getChangeClass(change: number): string {
    if (change > 0) {
      return 'text-success';
    } else if (change < 0) {
      return 'text-danger';
    } else {
      return 'text-secondary';
    }
  }

  getChangeIcon(change: number): string {
    if (change > 0) {
      return '↑';
    } else if (change < 0) {
      return '↓';
    } else {
      return '→';
    }
  }

  actualizarPortfolioValue(){
    this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
      this.inversiones = inversiones;
      this.currentValue = this.investmentService.getCurrentValue(inversiones);
      this.investedValue = this.investmentService.getInvestedValue(inversiones);
      this.currentChange = this.investmentService.getMonthlyChange(inversiones, true);
      this.investedChange = this.investmentService.getMonthlyChange(inversiones, false);
      this.avgRendimiento = this.currentValue / this.inversiones.length;
      this.totalInversiones = this.inversiones.length;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
