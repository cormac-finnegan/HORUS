import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from "./map/index";

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { routing } from './app.routing';

import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./_guards/index";
import {AlertService, AuthenticationService, UserService, UserTypeService} from "./_services";
import { RegisterComponent } from './register/register.component';
import {AlertComponent} from "./_directives/index";



/*const appRoutes: Routes = [
  /!*{ path: 'crisis-center', component: AppComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },*!/
/!*  {
    path: '**',
    component: PageNotFoundComponent
  },*!/
  {
    path: '',
    component: MapComponent,
    data: { title: 'Heroes List' }
  },
  { path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  },

];*/


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXLbMylHUJGEKYbJNv-N1gV68W_8HQ_rw'
    }),
    HttpClientModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    UserTypeService

  ],

  bootstrap: [ AppComponent ]
})
export class AppModule {}

