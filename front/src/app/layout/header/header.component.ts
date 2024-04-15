import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { IngresoComponent } from '../../ingreso/ingreso.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IngresoComponent, RouterLink],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

}
