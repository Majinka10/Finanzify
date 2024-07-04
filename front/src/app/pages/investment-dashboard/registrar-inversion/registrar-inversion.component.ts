import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { InversionService } from '../../../services/inversiones/inversion.service';

@Component({
  selector: 'app-registrar-inversion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-inversion.component.html',
  styleUrls: ['./registrar-inversion.component.css']
})
export class RegistrarInversionComponent implements OnInit {
  closeResult: string = '';

  formulario = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    tipo: new FormControl('', Validators.required)
  });

  tiposInversion: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private inversionService: InversionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.inversionService.getTiposInversion().subscribe(
    //   (tipos: any) => {
    //     this.tiposInversion = tipos;
    //   },
    //   (error) => {
    //     console.error('Error al obtener los tipos de inversión:', error);
    //   }
    // );
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
        this.formulario.reset();
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
      return `with: ${reason}`;
    }
  }

  public mensaje: string = '';
  public mostrar_mensaje: boolean = false;

  registrarInversion() {
    if (this.formulario.valid) {
      this.usuarioService.getUsuario().subscribe(usuario => {
        var user: any = usuario;
        var inversion = {
          cantidad: this.formulario.get('cantidad')?.value,
          fecha: this.formulario.get('fecha')?.value,
          descripcion: this.formulario.get('descripcion')?.value,
        //   tipo: this.tiposInversion.find(tipo => tipo.nombre === this.formulario.get('tipo')?.value).id,
          tipo: this.tiposInversion.find(tipo => tipo.nombre === this.formulario.get('tipo')?.value),
          usuario: user
        };

        console.log(inversion)

        // this.inversionService.registroInversion(inversion).subscribe(response => {
        //   this.usuarioService.update();
        //   this.modalService.dismissAll();
        //   },
        //   error => {
        //     console.error('Error al registrar la inversión:', error);
        //   });
      });
    } else {
      console.log('Formulario inválido, verifica los campos');
    }
  }
}
