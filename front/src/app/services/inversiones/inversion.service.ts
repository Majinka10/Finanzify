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

  getInversiones(usuario: any): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.urlInversion + "/usuario/" + usuario.correo);
  }
}

