import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeCuisineService {
  endpoint = environment.apiUrl + 'types/';

  constructor(private httpClient: HttpClient) { }

  getAllTypesOfCuisine(): Observable<any> {
    return this.httpClient.get(this.endpoint );
  }

}
