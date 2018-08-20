import {Component, OnInit} from "@angular/core";

import {EmployeeService, ModalService} from "../../_services/index";
import {Employee} from "../../_models/index";

@Component({
  selector: 'employees-admin',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  bodyText: string;
  employees: Employee[] = [];
  user: Object;
  userType: string;

  constructor(private modalService: ModalService, private employeeService: EmployeeService) {
  }


  ngOnInit() {

    this.bodyText = 'This text can be updated in modal 1';
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

  openModal(id: string) {
    console.log("Open Modal: " + id)
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


}
