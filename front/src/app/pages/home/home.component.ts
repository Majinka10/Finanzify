import { Component, OnInit } from '@angular/core';
import { RegistroComponent } from '../../components/registro/registro.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegistroComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
