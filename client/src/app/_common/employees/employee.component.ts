import {Component, OnInit} from "@angular/core";

import {EmployeeService, ModalService, UserService} from "../../_services/index";
import {Employee, User} from "../../_models/index";
import {FormControl, Validators} from "@angular/forms";
import {DateFormatter} from "ng-bootstrap";
import {isBoolean} from "util";

@Component({
  selector: 'employees-admin',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  newUserPassword:string;
  newUser: User;
  dob: Date;
  bodyText: string;
  employees: Employee[] = [];
  user: Object;
  userType: string;
  employee: Employee;
  defaultEmployee: Employee;

  constructor(private modalService: ModalService, private employeeService: EmployeeService, private userService: UserService) {
  }


  ngOnInit() {
    this.createDefaultEmployee()
    //this.createUser();

    this.employee = new Employee();


    var myDate = new Date(Date.now())
    console.log(new DateFormatter().format(myDate, "YYYY-MM-DD"));


    this.bodyText = 'This text can be updated in modal 1';
    this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    //this.getEmployees()

  }


  private getEmployees() {
    this.employeeService.getAll()
      .subscribe(
        employees => {
          console.log(employees);
          this.employees = employees;
        });
  }

  openModal(id: string) {
    console.log("Open Modal: " + id)
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  private createDefaultEmployee() {
    let defaultEmployee = new Employee();
    defaultEmployee.id = null;
    defaultEmployee.first_name = "First Name";
    defaultEmployee.last_name = "Last Name";
    defaultEmployee.email = "default.email@horus.com";
    defaultEmployee.walkie_talkie_channel = 1;
    defaultEmployee.contact_number = "000-000-0000";
    defaultEmployee.dob = new Date().toDateString();
    defaultEmployee.hire_date = new Date().toDateString();

    this.defaultEmployee = defaultEmployee;

  }

  showError(message: string) {
    console.log(message)
  }

  private validateUser(user: User) {

    if(user.username){
      this.userService.userExists(user.username)
        .subscribe(
          data => {
            if(data == true){
              this.showError("User Exists")
              return false;
            }
          });
      if (user.username.length < 4) {
        this.showError("Username too short")
        return false;
      }
    }

    if (user.password && user.password.length < 4) {
      this.showError("Password too short")
      return false;
    }

    if (user.type !== "3") {
      return false;
    }
    if (user.id !== null) {
      user.id = null;
    }

    return user;
  }

  private setUser(user: User) {

    this.newUser = user;

  }

  private createUser() {
    let newUser = new User();
    newUser.id = null;
    newUser.type = "2";
    newUser.username = this.employee.email;
    newUser.password = this.password;
    newUser.last_login = null;
    newUser.loggedin = false;

    console.log(this.validateUser(newUser));
  }

  saveEmployee() {
    this.createUser()
  }


}
