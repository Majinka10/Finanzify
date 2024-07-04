import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverallPerformanceComponent } from './overall-performance/overall-performance.component';
import { HeaderInternoComponent } from '../../components/header-interno/header-interno.component';
import { PortfolioValueComponent } from './portfolio-value/portfolio-value.component';
import { MovimientosRecientesComponent } from '../../components/movimientos-recientes/movimientos-recientes.component';
import { PlatformAllocationComponent } from './platform-allocation/platform-allocation.component';
import { InvestmentsChartComponent } from './investmets-chart/investments-chart.component';
import { RegistrarInversionComponent } from './registrar-inversion/registrar-inversion.component';
// import { PlatformAllocationComponent } from './platform-allocation.component';

@Component({
  selector: 'app-investment-dashboard',
  standalone: true,
  imports: [CommonModule, OverallPerformanceComponent,
    HeaderInternoComponent, PortfolioValueComponent, 
    MovimientosRecientesComponent, PlatformAllocationComponent,
    InvestmentsChartComponent, RegistrarInversionComponent
  ],
  templateUrl: './investment-dashboard.component.html',
  styleUrls: ['./investment-dashboard.component.css']
})
export class InvestmentDashboardComponent {}
