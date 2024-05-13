import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private http: HttpClient) { }

  urlTipo = "http://localhost:8080/tipo";
  urlEgreso = "http://localhost:8080/egresos";

  getTiposEgreso(){
    return this.http.get(this.urlTipo+"/egreso");
  }

  registroEgreso(egreso: any){

    return this.http.post(this.urlEgreso+"/registro", egreso);
    
  }

  getEgresosThisMonthEveryDay(usuario: any){
    return this.http.get(this.urlEgreso+"/thisMonth/everyDay/"+usuario.correo);
  }

  getEgresosThisMonthEveryDayType(usuario: any){
    return this.http.get(this.urlEgreso+"/thisMonth/everyDay/type/"+usuario.correo);
  }
}
