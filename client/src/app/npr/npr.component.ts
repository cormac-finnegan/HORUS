import { Component, OnInit } from '@angular/core';
import {User, UserType} from "../_models";
import {UserTypeService} from "../_services";

@Component({
  selector: 'app-npr',
  templateUrl: './npr.component.html',
  styleUrls: ['./npr.component.css']
})
export class NprComponent implements OnInit {
  user: User;
  userType: UserType;

  viewAllEnabled:boolean = false;
  newVisitorEnabled:boolean = false;

  constructor(private userTypeService:UserTypeService) { }

  ngOnInit() {

    this.user =  JSON.parse(localStorage.getItem('loggedinUser'));
    this.userTypeService.getById(parseInt(this.user.type))
      .subscribe(data => {
        this.userType = data[0].type
      })
  }

  viewAll(){
    this.viewAllEnabled = true;
    this.newVisitorEnabled = false;
  }

  newVisitor(){
    this.viewAllEnabled = false;
    this.newVisitorEnabled = true;

  }

}
