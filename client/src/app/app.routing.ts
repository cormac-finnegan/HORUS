import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { MapComponent } from './map/index';
import {LoginComponent} from "./login/index";
/*import { RegisterComponent } from './register/index';*/
import {AdminGuard, AuthGuard} from './_guards/index';
import {RegisterComponent} from "./register/index";
import {AdminComponent} from "./admin/admin.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'tracker', component: MapComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent , canActivate:[AuthGuard, AdminGuard]},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
