import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserType } from '../_models/index';

@Injectable()
export class UserTypeService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserType[]>('/rest/userTypes');
  }

  getById(id: number) {
    return this.http.get<UserType>('/rest/userTypes/' + id);
  }

  create(userType: UserType) {
    return this.http.post('/rest/userType', userType);
  }

  update(userType: UserType) {
    return this.http.put('/rest/userType/' + userType.id, userType);
  }

  delete(id: number) {
    return this.http.delete('/rest/userType/' + id);
  }
}
