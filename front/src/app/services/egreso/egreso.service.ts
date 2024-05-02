import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private http: HttpClient) { }

  urlTipo = "http://localhost:8080/tipo";
  urlIngreso = "http://localhost:8080/egresos";

  getTiposEgreso(){
    return this.http.get(this.urlTipo+"/egreso");
  }

  registroEgreso(egreso: any){

    return this.http.post(this.urlIngreso+"/registro", egreso);
    
  }
}
