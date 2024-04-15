import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import {NgbModal, ModalDismissReasons, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {
  // @ViewChild('modal') modal?: ElementRef;

  // openModal(){
  //   $(this.modal?.nativeElement).modal('show');
  // }

  // closeModal(){
  //   $(this.modal?.nativeElement).modal('hide');
  // }

  closeResult: string = '';
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal
    ) {}
    
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  correo: string = '';
  contrasena: string = '';
  public mensaje: string = '';
  public mostrar_mensaje: boolean = false;

  login(e: Event) {
    e.preventDefault();
    this.usuarioService.login(this.correo, this.contrasena).subscribe(
      response => {
        this.contrasena = "";
        this.mensaje = "";
        this.mostrar_mensaje = false;
        this.usuarioService.ingreso(this.correo);
        this.router.navigate(['/principal']);
        this.correo = "";
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
