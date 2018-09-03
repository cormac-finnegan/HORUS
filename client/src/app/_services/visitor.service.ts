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

  assignTracker(visitorID:number, trackerID:number) {
    console.log("In Service " + visitorID + " : " + trackerID)
    return this.http.put('/rest/visitors/'+visitorID + "/tracker/"+trackerID, JSON.stringify(trackerID));
  }

  removeTracker(visitorID:number, trackerID:number) {
    return this.http.delete('/rest/visitors/'+visitorID + "/tracker/"+trackerID);
  }

  update(visitor: Visitor) {
    return this.http.put('/rest/visitors/' + visitor.id, visitor);
  }

  delete(id: number) {
    return this.http.delete('/rest/visitors/' + id);
  }

  userExists(username: string) {
    return this.http.get('/rest/users/search/' + username)

  }


}


