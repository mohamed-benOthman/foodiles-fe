import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuisineTypesService {
  endpoint = environment.apiUrl + 'types/';
  constructor(private http: HttpClient) {

  }
  getAll() {
    return  this.http.get(this.endpoint);
  }

  addType(titre, path) {
    const data = {
      Libelle : titre,
      photo: path,
      thumbnail: path
    };
    return this.http.post(this.endpoint + 'create', data);
  }
  modifyType(titre, path, id ) {
    const data = {
      idType : id,
      Libelle : titre,
      photo: path,
      thumbnail: path
    };
    return this.http.post(this.endpoint + 'update', data);
  }


  deleteType(idEvents){
    return this.http.delete(this.endpoint+idEvents);
  }

  getById(idEvents){
    return this.http.get(this.endpoint+idEvents);
  }
}
