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

  create(user: Employee) {
    return this.http.post('/rest/users', user);
  }

  update(user: Employee) {
    return this.http.put('/rest/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/rest/users/' + id);
  }
}
