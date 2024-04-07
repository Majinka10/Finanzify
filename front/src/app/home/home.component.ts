import { Component, OnInit } from '@angular/core';

import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegistroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
