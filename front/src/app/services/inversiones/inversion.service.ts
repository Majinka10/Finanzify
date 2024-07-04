import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Inversion {
  id: number;
  cantidad: number;
  rendimiento: number;
  fecha: Date;
  descripcion: string;
  tipo: string; // Ascenso, Happy, etc.
}

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  constructor() {}

  getInversiones(): Observable<Inversion[]> {
    return of([
      { id: 1, cantidad: 100000, rendimiento: 120000, fecha: new Date('2023-01-01'), descripcion: 'Inversion en Cubo', tipo: 'Ascenso' },
      { id: 2, cantidad: 50000, rendimiento: 60000, fecha: new Date('2023-03-01'), descripcion: 'Inversion en Ahumados', tipo: 'Ascenso' },
      { id: 3, cantidad: 150000, rendimiento: 170000, fecha: new Date('2023-02-01'), descripcion: 'ETF en Happy', tipo: 'Happy' },
      { id: 4, cantidad: 20000, rendimiento: 25000, fecha: new Date('2023-04-01'), descripcion: 'Otro ETF en Happy', tipo: 'Happy' },
    ]);
  }

  getCurrentValue(inversiones: Inversion[]): number {
    return inversiones.reduce((sum, inv) => sum + inv.rendimiento, 0);
  }

  getInvestedValue(inversiones: Inversion[]): number {
    return inversiones.reduce((sum, inv) => sum + inv.cantidad, 0);
  }

  getMonthlyChange(inversiones: Inversion[], isCurrent: boolean): number {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthInvestments = inversiones.filter(inv => inv.fecha >= lastMonth && inv.fecha < now);
    const lastMonthInvestments = inversiones.filter(inv => inv.fecha < lastMonth);

    const thisMonthValue = thisMonthInvestments.reduce((sum, inv) => sum + (isCurrent ? inv.rendimiento : inv.cantidad), 0);
    const lastMonthValue = lastMonthInvestments.reduce((sum, inv) => sum + (isCurrent ? inv.rendimiento : inv.cantidad), 0);

    if (lastMonthValue === 0) return 0;
    return ((thisMonthValue - lastMonthValue) / lastMonthValue) * 100;
  }
}

