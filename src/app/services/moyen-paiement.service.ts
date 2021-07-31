import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoyenPaiementService {
  endpoint = environment.apiUrl + 'MoyenPaiement/';
  constructor(private http: HttpClient) {

  }

  getAllPaiement() {
   return  this.http.get(this.endpoint);
  }

  addPaiement(libelle) {
       const data = {
         libelle
       };
       return this.http.post(this.endpoint, data);
  }

  modifyPaiement(id, libelle){
    const data = {
      idMoyenPaiement: id,
      libelle: libelle
    }

    return this.http.post(this.endpoint + "modify", data);
  }

  deletePaiement(id){
    return this.http.delete(this.endpoint+id);
  }

}
