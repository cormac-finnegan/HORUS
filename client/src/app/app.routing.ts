import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { MapComponent } from './map/index';
import {LoginComponent} from "./login/index";
/*import { RegisterComponent } from './register/index';*/
import {AdminGuard, AuthGuard, SARGuard} from './_guards/index';
import {RegisterComponent} from "./register/index";
import {AdminComponent} from "./admin/admin.component";
import {SarComponent} from "./sar/sar.component";
import {NewVisitorComponent} from "./npr/AddVisitor/newVisitor.component";
import {NprComponent} from "./npr/npr.component";
import {ViewAllComponent} from "./npr/ViewAll/view-all.component";
import {NPRGuard} from "./_guards/npr.guard";


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sar/tracker', component: MapComponent, canActivate:[AuthGuard, SARGuard] },
  { path: 'npr/tracker', component: MapComponent, canActivate:[AuthGuard, NPRGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent , canActivate:[AuthGuard, AdminGuard]},
  { path: 'sar', component: SarComponent , canActivate:[AuthGuard]},
  { path: 'npr', component: NprComponent },
  { path: 'npr/viewAll', component: ViewAllComponent },
  { path: 'npr/addVisitor', component: NewVisitorComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
