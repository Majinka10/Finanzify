import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Usuarios';
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const url = 'http://localhost:8080/usuarios';
    this.http.get<any[]>(url).subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
}

