import {ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewChild} from "@angular/core";

import 'datatables.net';
import 'datatables.net-bs4';
import {Visitor} from "../../_models/visitor";
import {User} from "../../_models";
import {UserService} from "../../_services";
import {VisitorService} from "../../_services/visitor.service";


@Component({
  selector: 'visitors-npr',
  templateUrl: './newVisitorcomponent.html'
})
export class NewVisitorComponent implements OnInit {
  visitor: Visitor;
  errorMessage: string;
  minAgeDate: Date;


  constructor(private userService: UserService, private visitorService: VisitorService) {


  }

  ngOnInit() {
    this.visitor = new Visitor();
    this.getMinAgeDate();

  }

  showError(message:string){
    this.errorMessage = message;
    document.getElementById('newErrorMsg').hidden = false;
  }

  showSuccess(){
    this.errorMessage = null;
    document.getElementById('newErrorMsg').hidden = true;
    document.getElementById('newSuccessMsg').hidden = false;
    this.visitor= null;
  }


  validateEmail(email: string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  validateName(name: string) {
    return /^[a-z ,.'-]+$/i.test(name);
  }

  validatePhoneNumber(number: string) {
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(number);
  }

  getMinAgeDate() {
    var date = new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear() - 18);
    this.minAgeDate = new Date(date)
  }

  getDateNowAsDate() {
    return new Date(Date.now())
  }

  getDateNow() {
    return this.parseDate(new Date().toDateString())
  }

  parseDate(date: string) {
    return new Date(date).toISOString().split('T')[0]
  }


  private saveUser() {
    let newUser = new User();
    newUser.id = null;
    newUser.type = "4";
    newUser.username = this.visitor.email;
    var passString = this.visitor.first_name + "_" + this.visitor.last_name;
    newUser.password = passString.toLowerCase();
    newUser.last_login = null;
    newUser.loggedin = false;

    this.userService.userExists(newUser.username)
      .subscribe(data => {
        if (data === false) {
          this.userService.create(newUser)
            .subscribe((data) =>{
              let ref_id = JSON.parse(JSON.stringify(data)).insertId;

              this.visitor.user_ref = ref_id;
              this.visitor.tracker_id = null;

              this.visitorService.create(this.visitor)
                .subscribe(data => {
                  console.log("Final Pass = " + JSON.stringify(data))
                  this.showSuccess()
                })

            }),
          error => {
            this.showError(error)
            console.log('Internal error' + error)
          }
        } else {
          this.showError('User ' + newUser.username + ' already exists')
        }
      });
  }

  submit() {
    console.log("SUBMIT");

    this.saveUser();

    return false;
  }
}
