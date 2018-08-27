import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Visitor} from '../_models/index';

@Injectable()
export class VisitorService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Visitor[]>('/rest/visitors');
  }

  getById(id: number) {
    return this.http.get('/rest/visitors/' + id);
  }

  create(visitor: Visitor) {
    return this.http.post('/rest/visitors', visitor);
  }

  update(visitor: Visitor) {
    return this.http.put('/api/users/' + visitor.id, visitor);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  userExists(username: string) {
    return this.http.get('/rest/users/search/' + username)

  }


}


