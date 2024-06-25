import { Routes } from '@angular/router';

import { loginGuard } from './login.guard';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'about', component: DashboardComponent},
    { path: 'faqs', component: DashboardComponent},
    { path: 'presupuesto', component: DashboardComponent},
    { path: 'inversiones', component: DashboardComponent},
    { path: 'analitica', component: DashboardComponent},
    {
      path: '**',
      component: HomeComponent,
      title: 'Finanzify'
    },
    {
      path: '',
      component: HomeComponent,
      title: 'Finanzify'
    }
];
