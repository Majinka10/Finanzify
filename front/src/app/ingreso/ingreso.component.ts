import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { UsuarioService } from '../services/usuarios/usuario.service'

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent{
  formulario_login = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)    ])
  });

  constructor(
    private usuarioService : UsuarioService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.addClassValidate;
  }

  correo: string = '';
  contrasena: string = '';
  public mensage: string = '';
  public mostrar_mensaje : boolean = false;
  

  login(e: Event) {
    if (this.formulario_login.valid){
      e.preventDefault();
      this.usuarioService.login(this.correo, this.contrasena)
      .subscribe(
        response => {
          this.contrasena = ""
          this.mensage = "";
          this.mostrar_mensaje = false;
          this.usuarioService.ingreso(this.correo)
          this.router.navigate(['/principal']);
  
          this.correo = "";
          this.formulario_login.reset();
        },
        error => {
          this.mostrar_mensaje = true;
          if (error.status === 401 || error.status == 404) {
            this.mensage = error.error;
          } else {
            this.mensage = 'Error inesperado';
          }
        }
      );
    }
  }

  checkValidTouched(campo: string) {
    return (
      !this.formulario_login.get(campo)?.valid && this.formulario_login.get(campo)?.touched
    );
  }

  addClassValidate(campo: string) {
    return {
      'is-invalid': this.checkValidTouched(campo),
    };
  }
}
