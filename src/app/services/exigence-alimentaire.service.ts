import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ExigenceAlimentaire} from '../interfaces/exigenceAlimentaire';
import {HttpClient} from '@angular/common/http';
import {last} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExigenceAlimentaireService {
  endpoint = environment.apiUrl + 'exigenceAlimentaire/';

  constructor(private httpClient: HttpClient) { }

  getAllExigenceAlimentaire(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  }

  addExigenceAlimentaire(Libelle): Observable<any> {
    const data = {
      Libelle
    };
    return  this.httpClient.post(this.endpoint, data);
  }

  deleteExigence(id): Observable<any> {

    return  this.httpClient.delete(this.endpoint + id).pipe(last());
  }

  modifyExigence(id, Libelle): Observable<any> {
    const data = {
      id, Libelle
    };
    return  this.httpClient.post(this.endpoint + 'update', data);
  }
}
