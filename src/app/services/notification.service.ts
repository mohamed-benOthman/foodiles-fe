import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  sendNotification(title: string, body: string, idRestaurant: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.firebaseKey}`
    });
    const bodyData = {
      to : '/topics/' + environment.topics,
      mutable_content : true,
      content_available: true,
      priority: 'high',
      data : {
        content: {
          channelKey: 'foodiles_notif_id',
          title: title,
          body: body,
          notificationLayout: 'BigText',
          payload: {
            idResto: idRestaurant
          }
        }
      }
    };
   return  this.httpClient.post(environment.notificationEndpoint, bodyData, {headers});
  }
}
