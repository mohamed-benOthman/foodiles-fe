import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {last} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranchePrixService {

  endpoint = environment.apiUrl + 'trancheprix/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
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
