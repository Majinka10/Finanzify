import { Routes, RouterModule } from '@angular/router';
import { IngresoComponent } from './ingreso/ingreso.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { loginGuard } from './login.guard';

export const routes: Routes = [
    { path: 'ingreso', component: IngresoComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'principal', component: PrincipalComponent , canActivate: [loginGuard]},
    { path: '', redirectTo: '/ingreso', pathMatch: 'full' }
];
