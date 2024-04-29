import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items: {icon: string; title: string; link: string}[] = [
    {icon: 'bi-speedometer2', title: 'Dashboard', link: '/dashboard'},
    {icon: 'bi-cash-stack', title: 'Presupuesto', link: '/presupuesto'},
    {icon: 'bi-bar-chart', title: 'Inversiones', link: '/inversiones'},
    {icon: 'bi-pie-chart', title: 'Analítica', link: '/analitica'},
  ];
}
