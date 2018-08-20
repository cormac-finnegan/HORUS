import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {DataTable} from "angular5-data-table";

@Component({
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Object;
  username: string;
  userType: string;
  isLoggedIn: boolean;
  trackers: any[];


  constructor(private http: HttpClient) { }


  getUserTypeId(id: any) {
    console.log("In getUserTypeId")
    return this.http.get<any>('/rest/userTypes/' + id)
      .subscribe(UserType => {
          var type = JSON.parse(JSON.stringify(UserType[0])).type;
          this.userType = type;
          return UserType;
        }
      )
  }

  getAllTrackers() {
    console.log("In getUserTypeId")
    return this.http.get<any>('/rest/trackerNode')
      .subscribe((data: any[]) => {
          this.trackers = data;
        }
      )
  }

  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    this.username = JSON.parse(localStorage.getItem('loggedinUser')).username;
    this.getUserTypeId(JSON.parse(localStorage.getItem('loggedinUser')).type);
    this.getAllTrackers();

    this.isLoggedIn = false;


    console.log("Login Component: " + localStorage.getItem('loggedinUser'));
    //console.log("Login Component Type: " + localStorage.getItem('loggedInUserType'));



  }

  loadUserType(){
    var userType = JSON.parse(JSON.stringify(this.user)).type;

    if(userType == 1){
      return '<app-admin></app-admin>'
    }


  }

}
