import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IngresoComponent } from '../../../components/ingreso/ingreso.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IngresoComponent, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  constructor(
  ) {}  
}
