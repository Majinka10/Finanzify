import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../services/usuarios/usuario.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit, AfterViewInit {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeFormValidation();
  }

  correo: string = '';
  contrasena: string = '';
  public mensage: string = '';
  public mostrar_mensaje: boolean = false;

  login(e: Event) {
    e.preventDefault();
    this.usuarioService.login(this.correo, this.contrasena).subscribe(
      response => {
        this.contrasena = "";
        this.mensage = "";
        this.mostrar_mensaje = false;
        this.usuarioService.ingreso(this.correo);
        this.router.navigate(['/principal']);
        this.correo = "";
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

  private initializeFormValidation(): void {
    const forms = this.el.nativeElement.querySelectorAll('.needs-validation');

    Array.prototype.forEach.call(forms, (form: HTMLFormElement) => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }
}
