import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserTypeService} from "../_services/index";
import {Observable} from "rxjs";
import {User} from "../_models";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  //styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  toolViewEnabled: boolean;
  employeesViewEnabled: boolean;

  user: User;
  userType: string;

  constructor(private http: HttpClient, private userTypeService: UserTypeService) {
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('loggedinUser'));

    this.userTypeService.getById(JSON.parse(JSON.stringify(this.user)).type)
      .subscribe(
      userType => {
        this.userType = userType[0].type;

      });

    this.toolViewEnabled = false;

  }

  toolView(){
    this.employeesViewEnabled = false;
    this.toolViewEnabled = true;
  }

  employeeView(){
    this.toolViewEnabled = false;
    this.employeesViewEnabled = true;
  }

}


