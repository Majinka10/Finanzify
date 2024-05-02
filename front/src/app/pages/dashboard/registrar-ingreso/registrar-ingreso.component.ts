import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { IngresoService } from '../../../services/ingreso/ingreso.service';


@Component({
  selector: 'app-registrar-ingreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-ingreso.component.html',
  styleUrls: ['./registrar-ingreso.component.css']
})
export class RegistrarIngresoComponent implements OnInit{
  closeResult: string = '';

  formulario = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    tipo: new FormControl('', Validators.required)
  });

  // tiposIngreso = [
  //   { nombre: 'Salario', icono: 'bi-currency-dollar' },
  //   { nombre: 'Honorarios', icono: 'bi-pen' },
  //   { nombre: 'Ventas de productos', icono: 'bi-cart' },
  //   { nombre: 'Alquileres', icono: 'bi-house-check' },
  //   { nombre: 'Intereses bancarios', icono: 'bi-bank' },
  //   { nombre: 'Inversiones', icono: 'bi-bar-chart-line' },
  //   { nombre: 'Bonificaciones', icono: 'bi-gift' },
  //   { nombre: 'Comisiones', icono: 'bi-cash-stack' },
  //   { nombre: 'Subsidio', icono: 'bi-award' },
  //   { nombre: 'Regalías', icono: 'bi-gem' }
  // ];

  tiposIngreso: any[] = [];
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private ingresoService: IngresoService,
    private modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.ingresoService.getTiposIngreso().subscribe(
      (tipos: any) => {
        this.tiposIngreso = tipos;
      },
      (error) => {
        console.error('Error al obtener los tipos de ingreso:', error);
      }
    );
  }

  tipoSeleccionado: string = '';

  seleccionarTipo(tipo: string) {
    this.formulario.patchValue({ tipo: tipo });
  }

  checkValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
    );
  }

  addClassValidate(campo: string) {
    return {
      'is-invalid': this.checkValidTouched(campo),
    };
  }
    
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'dark-modal', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        // Resetear el formulario cuando se cierre el modal
        this.formulario.reset();
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // Resetear el formulario cuando se cierre el modal
        this.formulario.reset();
      }
    );
  }
  
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public mensaje: string = '';
  public mostrar_mensaje: boolean = false;

  registrarIngreso() {
    if (this.formulario.valid) {
      const datos = {
        cantidad: this.formulario.get('cantidad')?.value,
        fecha: this.formulario.get('fecha')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        tipo: this.formulario.get('tipo')?.value,
        icono: this.tiposIngreso.find(tipo => tipo.nombre === this.formulario.get('tipo')?.value)?.icono || ''
      };
  
      const respuesta = {
        registrarIngreso: {
          formularioValido: true,
          datos: datos,
          mensaje: 'Formulario válido, enviar datos al servidor',
          accion: 'Enviar los datos del formulario al servicio'
        }
      };
  
      console.log(datos);
  
      // Aquí puedes enviar los datos al backend utilizando este objeto JSON

    // Cerrar el modal una vez que se hayan enviado los datos
    this.modalService.dismissAll();
    } else {
      console.log('Formulario inválido, verifica los campos');
    }
  }
  
}

