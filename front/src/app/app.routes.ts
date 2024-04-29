import { Routes } from '@angular/router';

import { loginGuard } from './login.guard';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    // { path: 'about', component: DashboardComponent},
    // { path: 'faqs', component: IngresoComponent},
    // { path: 'dashboard', component: DashboardComponent , canActivate: [loginGuard]},
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
