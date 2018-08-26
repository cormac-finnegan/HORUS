import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {User} from "../_models";
import {UserTypeService} from "../_services";
import {AuthGuard} from "./auth.guard";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authGuard:AuthGuard) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Guard admin?  " + this.authGuard.isAdmin());
    return this.authGuard.isAdmin();

  }

}
