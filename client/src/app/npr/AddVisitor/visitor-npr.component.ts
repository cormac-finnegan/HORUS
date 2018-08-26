import {ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewChild} from "@angular/core";

import { parse, format, AsYouType } from 'libphonenumber-js';
import 'datatables.net';
import 'datatables.net-bs4';
import {Visitor} from "../../_models/visitor";
import {User} from "../../_models";



@Component({
  selector: 'visitors-npr',
  templateUrl: './visitor-npr.component.html'
})
export class VisitorNPRComponent implements OnInit {
  visitor:Visitor;
  errorMessage:string;
  minAgeDate:Date;


  constructor() {
    this.visitor = new Visitor();

  }

  onSubmit(){
    console.log("SUBMIT")
  }

  ngOnInit() {

    this.getMinAgeDate()

  }

  ngOnChanges(){
    console.log("TEST")
  }

  validateEmail(email:string){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  validateName(name:string){
    return /^[a-z ,.'-]+$/i.test(name);
  }

  validatePhoneNumber(number:string){
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(number);
  }

  validateDates(){
    if(new Date(this.visitor.dob).getFullYear() < new Date(Date.now()).getFullYear() - 18){
      this.errorMessage = "Visitor must be over the age of 18"
      return false;
    }


  }


  getMinAgeDate(){
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

  saveVisitor( visitor:Visitor){

  }

  private saveUser(){
    let newUser = new User();
    newUser.id = null;
    newUser.type = "4";
    newUser.username = this.visitor.email;
    var passString = this.visitor.first_name + "_" + this.visitor.last_name;
    newUser.password = passString.toLowerCase();
    newUser.last_login = null;
    newUser.loggedin = false;
    console.log(JSON.stringify(newUser))
  }

  submit() {
    console.log("SUBMIT")
    let newVisitor = this.visitor;

    this.saveUser()
    console.log(JSON.stringify(this.visitor))
    return false;
  }
}
