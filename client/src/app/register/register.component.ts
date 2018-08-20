import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, UserTypeService} from '../_services/index';
import {UserType} from '../_models';

@Component({
  templateUrl: 'register.component.html'
})

export class RegisterComponent  implements OnInit{
  model: any = {};
  userTypes: UserType[] = [];
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private alertService: AlertService) {


  }

  ngOnInit() {
    this.loadAllUserTypes()
    //console.log('!!!!!!!!!!!!' + (this.userTypes));
  }

  private loadAllUserTypes() {
    this.userTypeService.getAll()
      .subscribe(userTypes => {
        this.userTypes = userTypes;
      });
  }

  register() {
    this.loading = true;

    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
