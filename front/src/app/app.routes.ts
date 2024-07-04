import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvestmentDashboardComponent } from './pages/investment-dashboard/investment-dashboard.component';
import { AnaliticaDashboardComponent } from './pages/analitica-dashboard/analitica-dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'about', component: DashboardComponent},
    { path: 'faqs', component: DashboardComponent},
    { path: 'presupuesto', component: DashboardComponent},
    { path: 'inversiones', component: InvestmentDashboardComponent},
    { path: 'analitica', component: AnaliticaDashboardComponent},
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
