import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MapComponent} from "./map/index";

import {HttpClientModule} from '@angular/common/http';

import {routing} from './app.routing';

import {AgmCoreModule} from '@agm/core';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/login.component';
import {AdminGuard, AuthGuard, SARGuard} from "./_guards/index";
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

import {ToolComponent} from "./_common/tools/tool.component";
import {EmployeeComponent} from "./_common/employees/employee.component";

import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VisitorNPRComponent} from "./npr/AddVisitor/visitor-npr.component";
import {VisitorService} from "./_services/visitor.service";
import {ViewAllComponent} from "./npr/ViewAll/view-all.component";



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
    ModalComponent,
    VisitorNPRComponent,
    ViewAllComponent,

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
    BrowserAnimationsModule,
    CalendarModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthGuard,
    AdminGuard,
    SARGuard,
    AlertService,
    AuthenticationService,
    UserService,
    UserTypeService,
    ToolService,
    EmployeeService,
    ModalService,
    VisitorService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}

