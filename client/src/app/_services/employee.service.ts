import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Employee} from '../_models/index';
import {UserService} from "./user.service";

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  getAll() {
    return this.http.get<Employee[]>('/rest/employees');
  }

  getById(id: number) {
    return this.http.get('/rest/users/' + id);
  }

  getEmployeeByUserID<Employee>(id: number) {
    return this.http.get('/rest/employees/users/id/' + id);
  }

  create(employee: Employee) {
    console.log("\n IN CREATE SERVICE")
    return this.http.post('/rest/employees', employee);
  }

  update(employee: Employee) {
    return this.http.put('/rest/employees/' + employee.id, employee);
  }

  delete(id: number) {
    return this.http.delete('/rest/employees/' + id);
  }
}
