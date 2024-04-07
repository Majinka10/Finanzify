import { Routes, RouterModule } from '@angular/router';

import { IngresoComponent } from './ingreso/ingreso.component';
import { PrincipalComponent } from './principal/principal.component';
import { loginGuard } from './login.guard';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: 'ingreso', component: IngresoComponent },
    { path: 'principal', component: PrincipalComponent , canActivate: [loginGuard]},
    {
        path: '',
        component: HomeComponent,
        title: 'Finanzify'
      }
];
