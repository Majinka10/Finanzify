import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });

  constructor(
    private usuarioService : UsuarioService
  ){}

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

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirm_contrasena:string = '';
  public mensage: string = '';
  public mostrar_mensaje : boolean = false;
  claseAlert: string = 'alert alert-danger flex-grow-1';
  

  registro(e: Event) {
    if (this.formulario.valid){
      e.preventDefault();
      if(this.confirm_contrasena != this.contrasena){
        this.claseAlert = 'alert alert-danger flex-grow-1';
        this.mostrar_mensaje = true;
        this.mensage = "Las contraseñas no coinciden"
      }else{
        this.usuarioService.registro(this.nombre, this.correo, this.contrasena)
        .subscribe(
          response => {
            this.claseAlert = 'alert alert-success flex-grow-1';
            this.mostrar_mensaje = true;
            this.nombre = '';
            this.correo = ''
            this.contrasena = '';
            this.confirm_contrasena = '';
            this.mensage = 'Usuario creado con éxito';
            this.formulario.reset();
          },
          error => {
            this.mostrar_mensaje = true;
            this.claseAlert = 'alert alert-danger flex-grow-1';
            if (error.status === 409) {
              this.mensage = error.error;
            } else {
              this.mensage = 'Error inesperado';
              setTimeout(()=>{
                this.mostrar_mensaje = false;
              }, 5000)
            }
          }
        );
      }
    }
  }

}
