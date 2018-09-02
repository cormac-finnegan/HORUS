import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  title:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  login() {
    this.loading = true;
    console.log("In Alert")
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if(data.type == 1){
            this.returnUrl = "/admin"
          }else if(data.type == 2){
            this.returnUrl = "/sar"
          }else if(data.type == 3){
            this.returnUrl = "/npr"
          }else if(data.type == 4){
            this.returnUrl = "/visitor"
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error.error);
          this.loading = false;
        });
  }
}
