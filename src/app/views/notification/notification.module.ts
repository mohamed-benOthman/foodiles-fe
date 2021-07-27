import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    SendNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    FormsModule
  ]
})
export class NotificationModule { }
