import {Component, OnInit, ViewChild} from "@angular/core";

import {EmployeeService, ModalService, UserService} from "../../_services/index";
import {Employee, User} from "../../_models/index";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateFormatter} from "ng-bootstrap";

@Component({
  selector: 'employees-admin',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  hasError: boolean;
  errorMessage: string;
  newUserPassword: string;
  employees: Employee[] = [];
  user: Object;
  userType: string;
  employee: Employee;
  defaultEmployee: Employee;
  modalHeader: string;
  editMode:boolean;

  isSaved: boolean;

  constructor(private modalService: ModalService, private employeeService: EmployeeService, private userService: UserService) {
  }


  ngOnInit() {
    this.createDefaultEmployee()
    //this.createUser();
    this.isSaved = false;


    this.employee = new Employee();
    this.errorMessage = "";
    this.hasError = true;


    var myDate = new Date(Date.now())
    console.log(new DateFormatter().format(myDate, "YYYY-MM-DD"));

    this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    this.getEmployees()

  }


  private getEmployees() {
    this.employeeService.getAll()
      .subscribe(
        employees => {
          console.log(employees);
          this.employees = employees;
        });
  }

  openModal(id: string, header: string, newUser:boolean) {
    if(newUser == true){
      this.editMode = false;
    }else if(newUser == false){
      this.editMode = true;
    }
    console.log("Open Modal: " + id)
    this.modalHeader = header;
    //this.employee = new Employee();
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.discard()
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
    if (message != null) {
      console.log(message);
      this.errorMessage = message;
    } else {
      this.errorMessage = null;
      this.hasError = false;
    }


  }

  deleteEmployee(id: number) {
    console.log("DELETE ID " + id);
    this.employeeService.delete(id)
      .subscribe(data => {
          console.log("DELETE DATA " + JSON.stringify(data))
          this.getEmployees()
        }
      )

  }

  private validateUser(user: User) {

    if (user.username) {

    }
    if (user.username && user.username.length < 4) {
      this.showError("Username too short")
      return false;
    }
    if (user.password && user.password.length < 4) {
      this.showError("Password too short")
      return false;
    }

    if (user.type !== "3") {
      this.showError("Can only save as NPR")
      return false;
    }
    if (user.id !== null) {
      this.showError("Internal: User Type can only be NPR")
      user.id = null;
    }


    this.showError(null);
    return user;
  }

  private createUser() {
    console.log("Call create user")
    let newUser = new User();
    newUser.id = null;
    newUser.type = "3";
    newUser.username = this.employee.email;
    newUser.password = this.newUserPassword;
    newUser.last_login = null;
    newUser.loggedin = false;

    console.log("Error Message: " + this.hasError)
    if (this.validateUser(newUser) !== false && this.hasError === false) {
      console.log("Create User = true")
      this.userService.userExists(newUser.username)
        .subscribe(
          data => {
            if (data == true) {
              this.showError("User Exists");

              //return false;
            } else {
              this.userService.create(newUser)
                .subscribe(data => {
                  console.log("Data : " + JSON.stringify(data))
                  if (JSON.parse(JSON.stringify(data)).insertId) {
                    console.log("G O O D")
                    this.createEmployee(JSON.parse(JSON.stringify(data)).insertId)
                  }
                })
            }
          });

    }
  }

  editEmployee(employee: Employee, modalName: string, header: string) {
    employee.dob = this.parseDate(employee.dob);
    this.employee = employee;

    this.openModal(modalName, header, false);
  }

  newEmployee(modalName: string, header: string) {
    this.employee = new Employee()
    this.openModal(modalName, header, true);
  }

  private createEmployee(userId: number) {
    let employee = new Employee();
    employee.first_name = this.employee.first_name;
    employee.last_name = this.employee.last_name;
    employee.email = this.employee.email;
    employee.walkie_talkie_channel = this.employee.walkie_talkie_channel;
    employee.dob = this.employee.dob;
    employee.hire_date = new Date().toDateString();
    employee.contact_number = this.employee.contact_number;
    employee.user_ref = userId;

    this.employeeService.create(employee)
      .subscribe(data => {
        console.log("Data : " + JSON.stringify(data))
        if (JSON.parse(JSON.stringify(data)).insertId) {
          this.isSaved = true;
          this.getEmployees();
        }

      })

  }

  saveEmployee() {
    //console.log("Save: C L I C K ")

    if(!this.editMode){
      this.createUser();
    }else{
      let user = new Employee();
      this.userService.getById(this.employee.user_ref)
        .subscribe(data =>{
          user = data[0];
          console.log("User from DB = " + JSON.stringify(user))
        });

    }


    document.getElementById('closeButton').click();
  }

  discard() {
    if (this.isSaved) {
      this.employee = new Employee();
    }
  }

  safeClose(id: string) {
    if (this.isSaved) {
      this.closeModal(id)
    }
  }

  parseDate(date:string){
    return new Date(date).toISOString().split('T')[0]


    //return date.split(/[T]/);
  }

}
