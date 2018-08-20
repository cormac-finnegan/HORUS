import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MapComponent} from "./map/index";

import {HttpClientModule} from '@angular/common/http';

import {routing} from './app.routing';

import {AgmCoreModule} from '@agm/core';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./_guards/index";
import {
  AlertService,
  AuthenticationService,
  EmployeeService,
  ToolService,
  UserService,
  UserTypeService,
  ModalService
} from "./_services";
import {RegisterComponent} from './register/register.component';
import {AlertComponent, ModalComponent} from "./_directives/index";
import {AdminComponent} from './admin/admin.component';
import {NprComponent} from './npr/npr.component';
import {SarComponent} from './sar/sar.component';
import {VisitorComponent} from './visitor/visitor.component';

import {DataTableModule} from 'angular5-data-table';
import {ToolComponent} from "./_common/tools/tool.component";
import {EmployeeComponent} from "./_common/employees/employee.component";


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    NprComponent,
    SarComponent,
    VisitorComponent,
    ToolComponent,
    EmployeeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXLbMylHUJGEKYbJNv-N1gV68W_8HQ_rw'
    }),
    HttpClientModule,
    routing,
    DataTableModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    UserTypeService,
    ToolService,
    EmployeeService,
    ModalService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}

