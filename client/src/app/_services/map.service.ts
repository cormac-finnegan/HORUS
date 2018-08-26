import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class MapService {
  constructor(private http: HttpClient) {
  }

/*  getAll() {
    return this.http.get<Tool[]>('/rest/toolInventory');
  }

  getUserFromToolID(){

  }

  getById(id: number) {
    return this.http.get('/rest/toolInventory/' + id);
  }

  create(user: Tool) {
    return this.http.post('/rest/toolInventory', user);
  }

  update(user: Tool) {
    return this.http.put('/rest/toolInventory/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/rest/toolInventory/' + id);
  }*/
}
