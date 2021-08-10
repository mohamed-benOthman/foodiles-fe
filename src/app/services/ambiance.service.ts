import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmbianceService {
  endpoint = environment.apiUrl + 'cadreAmbiance/';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.endpoint);
  }
  addCadreAmbiance(libelle) {
    const data = {
      libelle
    };
    return this.http.post(this.endpoint+"create", data);
  }

  modifyCadreAmbiance(id, libelle){
    const data = {
      idCadreAmbiance: id,
      libelle: libelle
    }

    return this.http.post(this.endpoint + "modify", data);
  }

  deleteCadreAmbiance(id){
    return this.http.delete(this.endpoint+id);
  }

}
