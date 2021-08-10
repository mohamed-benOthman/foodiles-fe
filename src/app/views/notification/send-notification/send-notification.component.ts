import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable} from 'rxjs';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {
  public isLoading = true;
  public restaurantList$: Observable<any>;
  public extra = 0;
  title: string = '';
  body: string = '';
  public topics  = '';
  public url = '';
  success = false;
  failed = false;
  restaurant: string = '';
  constructor(private restaurantService: RestaurantsService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.restaurantList$ = this.restaurantService.getAllRestaurants();
    this.isLoading = false;

  }

  checkDisabled() {
    if (this.title === '' || this.body === ''  ) {
      return true;
    } else { return false; }
  }
   testExtra(){
    console.log(this.extra);
   }
  sendNotification() {
    this.success = false;
    this.failed = false;
    this.notificationService.sendNotification(this.title, this.body, this.restaurant, this.url, this.topics).subscribe((res: any) => {
      this.success = true;
    },
     error => {
      this.failed = true;
     }
    );
  }

}
