import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { InversionService, Inversion } from '../../../services/inversiones/inversion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-portfolio-value',
  standalone: true,
  templateUrl: './portfolio-value.component.html',
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
  performanceText: string = '';
  performanceClass: string = 'text-secondary';

  private subscription: Subscription;

  constructor(
    private investmentService: InversionService,
    private usuarioService: UsuarioService
  ) {
    this.subscription = this.usuarioService.updateFuncion$.subscribe(() => {
      this.actualizarPortfolioValue();
    });
  }

  ngOnInit(): void {
    if (this.usuarioService.isLogueado()) {
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true;

          this.actualizarPortfolioValue();
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  actualizarPortfolioValue() {
    this.investmentService.getInversiones(this.usuario).subscribe(inversiones => {
      this.inversiones = inversiones;
      this.currentValue = this.investmentService.getCurrentValue(inversiones);
      this.investedValue = this.investmentService.getInvestedValue(inversiones);

      const previousMonthValue = this.getPreviousMonthValue(inversiones, true);
      if (previousMonthValue !== 0) {
        const performanceChange = ((this.currentValue - previousMonthValue) / previousMonthValue) * 100;
        this.currentChange = performanceChange;

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
      } else {
        this.currentChange = 0;
        this.performanceText = `↔ 0.00% from last month`;
        this.performanceClass = 'text-secondary';
      }

      this.investedChange = this.investmentService.getMonthlyChange(inversiones, false);
      this.avgRendimiento = this.currentValue / this.inversiones.length;
      this.totalInversiones = this.inversiones.length;
    });
  }

  getPreviousMonthValue(inversiones: Inversion[], isCurrent: boolean): number {
    const now = new Date();
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthInvestments = inversiones.filter(inv => inv.fecha < previousMonth);

    return previousMonthInvestments.reduce((sum, inv) => sum + (isCurrent ? inv.rendimiento : inv.cantidad), 0);
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
      return '=';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
