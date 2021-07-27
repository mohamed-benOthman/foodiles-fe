import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SendNotificationComponent} from './send-notification/send-notification.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notification'
    },
    children: [
      {
        path: '',
        redirectTo: 'envoyer-notification'
      },
      {
        path: 'envoyer-notification',
        component: SendNotificationComponent,
        data: {
          title: 'Envoyer une notification'
        }
      }


    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
