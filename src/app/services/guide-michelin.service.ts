import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideMichelinService {

  endpoint = environment.apiUrl + 'GuideMichelin/';
  constructor(private http: HttpClient) {

  }

  getAllPaiement() {  //same for guide
    return  this.http.get(this.endpoint);
  }

  addPaiement(libelle) :Observable<any> {
    const data = {
      libelle
    };
    return this.http.post(this.endpoint, data);
  }

  modifyPaiement(id, libelle){
    const data = {
      idGuideMichelin: id,
      libelle: libelle
    }

    return this.http.post(this.endpoint + "modify", data);
  }

  deletePaiement(id){
    return this.http.delete(this.endpoint+id);
  }
}
