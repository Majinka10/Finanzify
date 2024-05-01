import { Component, OnInit } from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-header-interno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-interno.component.html',
  styleUrl: './header-interno.component.css'
})
export class HeaderInternoComponent implements OnInit{


  myDate = formatDate(new Date(), 'EEEE, d \'de\' MMMM', 'en');

  titulo: string = 'Revisemos tus estadísticas financieras'; // Texto por defecto

  constructor(public usuarioService : UsuarioService,
    private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Cambiar el texto del título según la ruta actual
        switch (this.router.url) {
          case '/presupuesto':
            this.titulo = 'Revisemos tus presupuestos';
            break;
            case '/inversiones':
              this.titulo = 'Revisemos tus inversiones';
            break;
          case '/analitica':
            this.titulo = 'Revisemos tus estadísticas financieras';
            break;
          default:
            this.titulo = 'Revisemos tu panorama financiero'; // Valor por defecto
            break;
        }
      }
    });
  }

  usuario: any;
  usuarioCargado: boolean = false; // Variable para controlar si el usuario ha sido cargado

  ngOnInit(){
    if(this.usuarioService.isLogueado()){
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true; // Indicar que el usuario ha sido cargado correctamente
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }
}
