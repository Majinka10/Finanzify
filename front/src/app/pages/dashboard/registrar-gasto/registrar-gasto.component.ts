import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-gasto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-gasto.component.html',
  styleUrl: './registrar-gasto.component.css'
})
export class RegistrarGastoComponent {
  closeResult: string = '';

  formulario = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    tipo: new FormControl('', Validators.required)
  });

  tiposGasto = [
    { nombre: 'Alquiler o hipoteca', icono: 'bi-house' },
    { nombre: 'Alimentación', icono: 'bi-food' },
    { nombre: 'Servicios públicos', icono: 'bi-lightning-charge-fill' },
    { nombre: 'Transporte', icono: 'bi-bus-front-fill' },
    { nombre: 'Educación', icono: 'bi-mortarboard' },
    { nombre: 'Salud', icono: 'bi-bandaid' },
    { nombre: 'Entretenimiento', icono: 'bi-controller' },
    { nombre: 'Impuestos', icono: 'bi-file-earmark-bar-graph' },
    { nombre: 'Mantenimiento del hogar', icono: 'bi-tools' },
    { nombre: 'Libros', icono: 'bi-book' },
    { nombre: 'Ropa', icono: 'bi-handbag-fil' },
    { nombre: 'Tecnología', icono: 'bi-laptop' },
    { nombre: 'Deudas y préstamos', icono: 'bi-credit-card' }
  ];


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal
  ) {}

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

  registrarGasto() {
    if (this.formulario.valid) {
      const datos = {
        cantidad: this.formulario.get('cantidad')?.value,
        fecha: this.formulario.get('fecha')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        tipo: this.formulario.get('tipo')?.value,
        icono: this.tiposGasto.find(tipo => tipo.nombre === this.formulario.get('tipo')?.value)?.icono || ''
      };
  
      const respuesta = {
        registrarGasto: {
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
