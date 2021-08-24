import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BonPlanService {
  endpoint = environment.apiUrl + 'bonPlan/';
  constructor(private http: HttpClient) {

  }

  getAll() {
    return  this.http.get(this.endpoint);
  }


  getByid(id){
    return  this.http.get(this.endpoint+id);
  }
  addEvent(titre, path, details,dateDebut , dateFin, idRestaurant) {
    const data = {
      titre,
      path,
      details,
      dateDebut,
      dateFin,
      idRestaurant
    };
    return this.http.post(this.endpoint + 'create', data);
  }
  modifyBonPlan(titre, path, details,dateDebut , dateFin, idRestaurant, idBonPlan) {
    const data = {
      titre,
      path,
      details,
      dateDebut,
      dateFin,
      idRestaurant,
      idBonPlan
    };
    return this.http.post(this.endpoint + 'modify', data);
  }


  deleteBonplan(idEvents){
    return this.http.delete(this.endpoint+idEvents);
  }
}
