﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_models/index';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>('/rest/users');
  }

  getById(id: number) {
    return this.http.get('/rest/users/' + id);
  }

  create(user: User) {
    return this.http.post('/rest/users', user);
  }

  update(user: User) {
    return this.http.put('/rest/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  userExists(username: string) {
    return this.http.get('/rest/users/search/' + username)

  }


}


