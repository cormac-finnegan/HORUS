import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthGuard} from "./auth.guard";

@Injectable()
export class NPRGuard implements CanActivate {

  constructor(private router: Router, private authGuard:AuthGuard) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Guard npr?  " + this.authGuard.isNPR());
    return this.authGuard.isNPR();

  }

}
