import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {User} from "../_models";
import {UserTypeService} from "../_services";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userTypeService: UserTypeService) {
  }

  user: User;

  admin:boolean = false;
  npr:boolean = false;
  sar:boolean = false;
  visitor:boolean = false;


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('loggedinUser')) {
      this.user = JSON.parse(localStorage.getItem('loggedinUser'));

      if(this.getUserType() === 1){
        this.admin = true;
      }else if(this.user.type === '2'){
        this.sar = true;
      }else if(this.user.type === '3'){
        this.npr = true;
      }else if(this.user.type === '4'){
        this.visitor = true;
      }

      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  getUserType() {
    return parseInt(this.user.type);
  }

  getUserTypeString() {
    this.userTypeService.getById(this.getUserType());
  }

  public isAdmin(){
    return this.admin;
  }

  isNPR(){
    return this.npr;
  }

  isSAR(){
    return this.sar
  }

  isVisitor(){
    return this.visitor;
  }

}
