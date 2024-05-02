import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { EgresoService } from '../../../services/egreso/egreso.service';

@Component({
  selector: 'app-registrar-gasto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-gasto.component.html',
  styleUrl: './registrar-gasto.component.css'
})
export class RegistrarGastoComponent implements OnInit{
  closeResult: string = '';

  formulario = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    tipo: new FormControl('', Validators.required)
  });

  // tiposegreso = [
  //   { nombre: 'Alquiler o hipoteca', icono: 'bi-house' },
  //   { nombre: 'Alimentación', icono: 'bi-food' },
  //   { nombre: 'Servicios públicos', icono: 'bi-lightning-charge-fill' },
  //   { nombre: 'Transporte', icono: 'bi-bus-front-fill' },
  //   { nombre: 'Educación', icono: 'bi-mortarboard' },
  //   { nombre: 'Salud', icono: 'bi-bandaid' },
  //   { nombre: 'Entretenimiento', icono: 'bi-controller' },
  //   { nombre: 'Impuestos', icono: 'bi-file-earmark-bar-graph' },
  //   { nombre: 'Mantenimiento del hogar', icono: 'bi-tools' },
  //   { nombre: 'Libros', icono: 'bi-book' },
  //   { nombre: 'Ropa', icono: 'bi-handbag-fil' },
  //   { nombre: 'Tecnología', icono: 'bi-laptop' },
  //   { nombre: 'Deudas y préstamos', icono: 'bi-credit-card' }
  // ];

  tiposEgreso: any[] = [];


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal,
    private egresoService: EgresoService
  ) {}

  ngOnInit(): void {
    this.egresoService.getTiposEgreso().subscribe(
      (tipos: any) => {
        this.tiposEgreso = tipos;
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

  registrarEgreso() {
    if (this.formulario.valid){

      this.usuarioService.getUsuario().subscribe(usuario => {

        var user: any = usuario;

        var egreso = {
          cantidad: this.formulario.get('cantidad')?.value,
          fecha: this.formulario.get('fecha')?.value,
          descripcion: this.formulario.get('descripcion')?.value,
          tipo: this.tiposEgreso.find(tipo => tipo.nombre === this.formulario.get('tipo')?.value).id,
          usuario: user.correo
        };

        this.egresoService.registroEgreso(egreso).subscribe(response => {
          this.usuarioService.update(); // Actualizar informacion del usuario
          this.modalService.dismissAll();

          },
          error => {
            console.error('Error al registrar el egreso:', error);
          });

      });

    } else {
      console.log('Formulario inválido, verifica los campos');
    }
  }

}
