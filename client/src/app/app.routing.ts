import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { MapComponent } from './map/index';
import {LoginComponent} from "./login/index";
/*import { RegisterComponent } from './register/index';*/
import { AuthGuard } from './_guards/index';
import {RegisterComponent} from "./register/index";

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'tracker', component: MapComponent },
  { path: 'register', component: RegisterComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
