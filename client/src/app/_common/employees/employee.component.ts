import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";

import {EmployeeService, ModalService, UserService} from "../../_services/index";
import {Employee, User} from "../../_models/index";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {DateFormatter} from "ng-bootstrap";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'employees-admin',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  newUserPassword: string;
  employees: Employee[] = [];
  user: Object;
  userType: string;
  employee: Employee;
  defaultEmployee: Employee;
  modalHeader: string;
  editMode: boolean;

  isSaved: boolean;

  dataTable: any;


  constructor(private modalService: ModalService, private employeeService: EmployeeService, private userService: UserService, private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getEmployees();
    this.createDefaultEmployee();
    //this.createUser();
    this.isSaved = false;

    this.employee = new Employee();

    var myDate = new Date(Date.now())
    console.log(new DateFormatter().format(myDate, "YYYY-MM-DD"));

    this.user = JSON.parse(localStorage.getItem('loggedinUser'));

    //this.initTable().search('TEST')

    $(document).ready(function () {

      $('#employeeTable_filter input').css("display:none")

      $('#employeeTable')
        .on('order.dt', function () {
          console.log('Order');
        })
        .on('search.dt', function () {
          console.log('Search');
        })
        .on('page.dt', function () {
          console.log('Page');
        })
        .on('length.dt', function () {
          console.log('Show');
        });

      $('#searchbox')
        .on('keyup', function () {
          $('#employeeTable').DataTable({
            "searching": true,
            retrieve: true
          }).on('length.dt', function () {
            console.log("Length Event");
          }).search(this.value).draw();
        })
    });

  }

  private getEmployees() {
    this.employeeService.getAll()
      .subscribe(
        (employees: any[]) => {
          this.employees = employees;

          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable({
            "searching": true,
            retrieve: true
          });

        });
  }

  openModal(id: string, header: string, newUser: boolean) {
    if (newUser == true) {
      this.editMode = false;
    } else if (newUser == false) {
      this.editMode = true;
    }
    this.modalHeader = header;
    //this.employee = new Employee();
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
      document.getElementById("errorMsg").hidden = false;
      document.getElementById("errorMsg").textContent = message;

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

    if (this.validateUser(newUser) !== false) {
      console.log("Create User = true");
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
                }),
                error => {

                }
            }
          },
          error => {

          })


    }
  }


  editEmployee(employee: Employee, modalName: string, header: string) {
    employee.dob = this.parseDate(employee.dob);
    this.employee = employee;
    console.log(JSON.stringify(this.employee))

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
          //this.isSaved = true;
          var elements = document.getElementsByTagName('modal');
          var id = elements[0].getAttribute('id');

          this.closeModal(id);

          this.getEmployees();


        }

      }),
      error => {
        this.showError(error)
      }

  }

  saveEmployee() {
    console.log("Save: C L I C K ")

    if (!this.editMode) {
      this.createUser();
    } else {
      this.employeeService.update(this.employee)
        .subscribe(data => {
          console.log("OK?" + data)
        })
    }

  }

  discard() {

    this.employee = new Employee();

  }

  parseDate(date: string) {
    return new Date(date).toISOString().split('T')[0]


    //return date.split(/[T]/);
  }

}
