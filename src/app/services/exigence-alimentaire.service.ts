import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ExigenceAlimentaire} from '../interfaces/exigenceAlimentaire';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExigenceAlimentaireService {
  endpoint = environment.apiUrl + 'exigenceAlimentaire/';

  constructor(private httpClient: HttpClient) { }

  getAllExigenceAlimentaire(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  }
}
