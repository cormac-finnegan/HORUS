import { Component, OnInit } from '@angular/core';
import {Employee, User, UserType} from "../_models";
import {EmployeeService, UserTypeService} from "../_services";

@Component({
  selector: 'app-npr',
  templateUrl: './npr.component.html',
  styleUrls: ['./npr.component.css']
})
export class NprComponent implements OnInit {
  user: User;

  //create an empty Employee to stop Angular from complaining about type errors before rest call
  employee:Employee = new Employee();
  userType: string;

  viewAllEnabled:boolean = false;
  newVisitorEnabled:boolean = false;
  homeViewEnabled:boolean = false;
  trackerViewEnabled:boolean = false;

  constructor(private userTypeService:UserTypeService, private employeeService:EmployeeService) { }

  ngOnInit() {

    this.user =  JSON.parse(localStorage.getItem('loggedinUser'));
    this.userTypeService.getById(parseInt(this.user.type))
      .subscribe(data => {
        this.userType = data[0].type
      });

    this.employeeService.getEmployeeByUserID(this.user.id)
      .subscribe(data => {
        this.employee = JSON.parse(JSON.stringify(data[0]));
      });

    this.homeView()

    //console.log("Employee: " + JSON.stringify(this.employee))

  }

  trackerView(){
    this.homeViewEnabled = false;
    this.viewAllEnabled = false;
    this.newVisitorEnabled = false;
    this.trackerViewEnabled = true;
  }

  viewAll(){
    this.homeViewEnabled = false;
    this.viewAllEnabled = true;
    this.newVisitorEnabled = false;
    this.trackerViewEnabled = false;
  }

  newVisitor(){
    this.homeViewEnabled = false;
    this.viewAllEnabled = false;
    this.newVisitorEnabled = true;
    this.trackerViewEnabled = false;
  }

  homeView(){
    this.homeViewEnabled = true;
    this.viewAllEnabled = false;
    this.newVisitorEnabled = false;
    this.trackerViewEnabled = false;
  }

}
