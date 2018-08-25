import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Employee} from '../_models/index';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Employee[]>('/rest/employees');
  }

  getById(id: number) {
    return this.http.get('/rest/users/' + id);
  }

  create(employee: Employee) {
    console.log("\n IN CREATE SERVICE")
    return this.http.post('/rest/employees', employee);
  }

  update(employee: Employee) {
    return this.http.put('/rest/employees/' + employee.id, employee);
  }

  delete(id: number) {
    console.log("Service ID = " + id)
    return this.http.delete('/rest/employees/' + id);
  }
}
