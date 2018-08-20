import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {UserType} from "../_models";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    console.log("In Login")
    return this.http.post<any>('/rest/auth', {username: username, password: password})
      .map(user => {
          // login successful if there's a jwt token in the response
          localStorage.setItem('loggedinUser', JSON.stringify(user));
          //console.log("LoggedinUser = " + JSON.stringify(JSON.parse(localStorage.getItem('loggedinUser'))));
          var userTypeId = JSON.parse(localStorage.getItem('loggedinUser')).type;
          //localStorage.clear()
          //this.getUserTypeId(userTypeId);
          //console.log("LoggedinUserType = " + JSON.parse(localStorage.getItem('loggedInUserType')))

          return user;
        }
      )

  }



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('loggedinUser');
    //localStorage.removeItem('loggedInUserType');
  }
}
