import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgbModal, ModalDismissReasons, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {
  closeResult: string = '';

  // Declaración de los campos que deben ser validados en el formulario
  formulario = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)])
  });
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    this.addClassValidate;
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'dark-modal', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  login(e: Event) {
    e.preventDefault();
    const correo: string = this.formulario.get('email')?.value?.toString() || '';
    const contrasena: string = this.formulario.get('password')?.value?.toString() || '';
    this.usuarioService.login(correo, contrasena).subscribe(
      response => {
        this.mensaje = "";
        this.mostrar_mensaje = false;
        this.usuarioService.ingreso(correo);
        this.modalService.dismissAll(); // Cerrar modal - cierr la ventana de login antes de redirigir
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.mostrar_mensaje = true;
        if (error.status === 401 || error.status == 404) {
          this.mensaje = error.error;
        } else {
          this.mensaje = 'Error inesperado';
        }
      }
    );
  }
}
