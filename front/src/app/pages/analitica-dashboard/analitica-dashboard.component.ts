import { Component } from '@angular/core';
import { HeaderInternoComponent } from '../../components/header-interno/header-interno.component';
import { MovimientosRecientesComponent } from '../../components/movimientos-recientes/movimientos-recientes.component';
import { DistribucionGastosComponent } from '../../components/distribucion-gastos/distribucion-gastos.component';
import { ComparacionIngresosGastosComponent } from './comparacion-ingresos/comparacion-ingresos-gastos.component';
import { DistribucionAnoComponent } from '../../components/distribucion-ano/distribucion-ano.component';
import { DistribucionIngresosComponent } from '../../components/distribucion-ingresos/distribucion-ingresos.component';

@Component({
    selector: 'app-analitica-dashboard',
    standalone: true,
    imports:[HeaderInternoComponent, MovimientosRecientesComponent,
         DistribucionGastosComponent, ComparacionIngresosGastosComponent,
         DistribucionAnoComponent, DistribucionIngresosComponent
    ],
    templateUrl: './analitica-dashboard.component.html',
    styleUrl: './analitica-dashboard.component.css'
})
export class AnaliticaDashboardComponent {}