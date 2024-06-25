import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/balance";

  getBalance(usuario:any){
    return this.http.post(this.url+"/getBalance",  usuario );
  }
}
