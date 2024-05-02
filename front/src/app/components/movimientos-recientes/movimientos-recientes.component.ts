import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { MovimientoService } from '../../services/movimientos/movimiento.service';


@Component({
  selector: 'app-movimientos-recientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movimientos-recientes.component.html',
  styleUrl: './movimientos-recientes.component.css'
})
export class MovimientosRecientesComponent implements OnInit{

  constructor(
    public usuarioService : UsuarioService,
    public movimientoService : MovimientoService
  ){}

  // items_last: {icon: string; title: string; fecha: string; cantidad: number; tipo: string}[] = [
  //   {icon: "bi-house-check", title: "Arriendo", fecha: "Marzo 22, 2024", cantidad: 50000, tipo: "Gasto"},
  //   { icon: "bi-currency-dollar", title: "Salario", fecha: "Marzo 16, 2024", cantidad: 80000, tipo: "Ingreso" },
  //   { icon: "bi-receipt", title: "Recibo de la luz", fecha: "Marzo 12, 2024", cantidad: 20000, tipo: "Gasto" },
  //   { icon: "bi-bag", title: "Zapatos", fecha: "Marzo 03, 2024", cantidad: 5000, tipo: "Gasto" },
  //   { icon: "bi-bandaid", title: "Gastos médicos", fecha: "Marzo 01, 2024", cantidad: 3000, tipo: "Gasto" }
  // ];

  items_future: {icon: string; title: string; fecha: string; cantidad: number; tipo: string}[] = [
    {icon: "bi-car-front", title: "Cambio de aceite", fecha: "Marzo 28, 2024", cantidad: 10000, tipo: "Gasto"},
    { icon: "bi-cash-coin", title: "Pago intereses", fecha: "Abril 01, 2024", cantidad: 12000, tipo: "Ingreso" },
    { icon: "bi-credit-card", title: "Pago cuota", fecha: "Abril 06, 2024", cantidad: 5000, tipo: "Gasto" },
  ];

  items_last: any;
  
  usuario: any;
  usuarioCargado: boolean = false; // Variable para controlar si el usuario ha sido cargado

  ngOnInit(){
    if(this.usuarioService.isLogueado()){
      //cargar el usuario logueado
      this.usuarioService.getUsuario().subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuarioCargado = true; // Indicar que el usuario ha sido cargado correctamente

          //cargar los movimientos recientes
          this.movimientoService.getMovimientosRecientes(this.usuario).subscribe(
            movimientos => {
              this.items_last = movimientos;
            },
            error => {
              console.error('Error al obtener los movimientos:', error);
            }
          );
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }
}
