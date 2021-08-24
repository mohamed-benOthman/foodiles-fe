import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = environment.apiUrl + 'user/';
  constructor(private http: HttpClient) {

  }
  getAll() {
    return  this.http.get(this.endpoint);
  }

  addUser(data) {

    return this.http.post(this.endpoint , data);
  }
  ModifyUser(data ) {
    return this.http.post(this.endpoint + 'modify', data);
  }


  deleteuser(idUser){
    return this.http.delete(this.endpoint+idUser);
  }

  getById(idUser){
    return this.http.get(this.endpoint+idUser);
  }


}
