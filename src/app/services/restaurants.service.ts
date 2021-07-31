import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
   endpoint = environment.apiUrl + 'restaurant/';
  constructor(private httpClient: HttpClient) { }


  getAllRestaurants(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'all');
  }

  getRestaurantById(id: string): Observable<any> {
    return  this.httpClient.get(this.endpoint + 'restodetails/' + id);
  }

  deleteImage(restaurantId, photoId ): Observable<any> {
    const data = {
      restaurantId,
      photoId
    };
    return this.httpClient.post(this.endpoint + 'deleteImage', data);
  }

  deleteCommentaire(restaurantId, commentaireId ): Observable<any> {
    const data = {
      restaurantId,
      commentaireId
    };
    return this.httpClient.post(this.endpoint + 'deleteCommentaire', data);
  }

  deleteRestaurant(restaurantId ): Observable<any> {

    return this.httpClient.delete(this.endpoint + restaurantId);
  }

  modifyRestaurant(data ): Observable<any> {

    return this.httpClient.post(this.endpoint + 'modifyRestaurant', data);  }


  modifyMenu(id, menut ): Observable<any> {
    const menuData = JSON.stringify(menut)
     const data ={
       idRestaurant: id,
       menu: menuData
     }
    return this.httpClient.post(this.endpoint + 'modifyMenu', data);  }

}
