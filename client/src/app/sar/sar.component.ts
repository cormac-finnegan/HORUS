import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../_guards";
import {UserTypeService} from "../_services";

@Component({
  selector: 'app-sar',
  templateUrl: './sar.component.html',
  styleUrls: ['./sar.component.css']
})
export class SarComponent implements OnInit {

  constructor(private userTypeService:UserTypeService, private authGuard:AuthGuard) { }

  userType:string;

  ngOnInit() {

    this.getUserTypeString()


  }

  getUserTypeString() {
    this.userTypeService.getById(this.authGuard.getUserType())
      .subscribe(data => {
        this.userType =  data[0].type;
      });
  }

}
