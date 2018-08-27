import {Component, OnInit} from "@angular/core";

import 'datatables.net';
import 'datatables.net-bs4';
import {Visitor} from "../../_models/visitor";
import {UserService} from "../../_services";
import {VisitorService} from "../../_services/visitor.service";
import {User} from "../../_models";


@Component({
  selector: 'view-all-visitors',
  templateUrl: './view-all.component.html'
})
export class ViewAllComponent implements OnInit {
  visitorList: Visitor[] = [];
  public user:User;
  public userType:string;


  constructor(private userService: UserService, private visitorService: VisitorService) {


  }

  ngOnInit() {
    this.getAll();

  }

  getAll(){
    this.visitorService.getAll()
      .subscribe((visitors:Visitor[]) => {
        this.visitorList = visitors

      })
  }

  deleteVisitor(id: number) {
    this.visitorService.delete(id)
      .subscribe(data => {
        console.log(data)

      })
  }
}
