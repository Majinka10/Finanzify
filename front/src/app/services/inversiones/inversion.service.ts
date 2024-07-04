import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

  urlInversion = "http://localhost:8080/inversion";
  urlTipo = "http://localhost:8080/tipo";

  getInversiones(usuario: any): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.urlInversion + "/usuario/" + usuario.correo);
  }

  getCurrentValue(inversiones: Inversion[]): number {
    return inversiones.reduce((sum, inv) => sum + inv.rendimiento, 0);
  }

  getTiposInversion() {
    return this.http.get(this.urlTipo + "/inversion");
  }

  registroInversion(inversion: any) {
    return this.http.post(this.urlInversion + "/registro", inversion);
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

