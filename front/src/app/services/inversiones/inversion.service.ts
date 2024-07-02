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
      { id: 1, cantidad: 10000, rendimiento: 12000, fecha: new Date('2023-01-01'), descripcion: 'Inversion en Cubo', tipo: 'Ascenso' },
      { id: 2, cantidad: 5000, rendimiento: 6000, fecha: new Date('2023-03-01'), descripcion: 'Inversion en Ahumados', tipo: 'Ascenso' },
      { id: 3, cantidad: 15000, rendimiento: 17000, fecha: new Date('2023-02-01'), descripcion: 'ETF en Happy', tipo: 'Happy' },
      { id: 4, cantidad: 2000, rendimiento: 2500, fecha: new Date('2023-04-01'), descripcion: 'Otro ETF en Happy', tipo: 'Happy' },
    ]);
  }
}

