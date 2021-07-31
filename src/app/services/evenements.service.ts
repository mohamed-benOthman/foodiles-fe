import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
  endpoint = environment.apiUrl + 'events/';
  constructor(private http: HttpClient) {

  }

  getAll() {
    return  this.http.get(this.endpoint);
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
  modifyEvent(titre, path, details,dateDebut , dateFin, idRestaurant, idEvents) {
    const data = {
      titre,
      path,
      details,
      dateDebut,
      dateFin,
      idRestaurant,
      idEvents
    };
    return this.http.post(this.endpoint + 'modify', data);
  }


  deleteEvent(idEvents){
    return this.http.delete(this.endpoint+idEvents);
  }
}
