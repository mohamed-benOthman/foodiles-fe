import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestaurantsRoutingModule} from './restaurants-routing.module';
import { ListeRestaurantsComponent } from './liste-restaurants/liste-restaurants.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import {CarouselComponent, CarouselModule} from 'ngx-bootstrap/carousel';
import { ImagesManagementComponent } from './images-management/images-management.component';
import { ImageRestaurantComponent } from './image-restaurant/image-restaurant.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalComponent} from '../../components/modal/modal.component';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { CommentairesRestaurantManagementComponent } from './commentaires-restaurant-management/commentaires-restaurant-management.component';
import {RatingComponent} from '../../components/rating/rating.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { ModifyCommentaireComponent } from './commentairesRestaurantManagement/modify-commentaire/modify-commentaire.component';


@NgModule({
  declarations: [
    ListeRestaurantsComponent,
    SpinnerComponent,
    RestaurantDetailComponent,
    ImagesManagementComponent,
    ImageRestaurantComponent,
    RatingComponent,
    CommentairesComponent,
    CommentairesRestaurantManagementComponent,
    ModifyCommentaireComponent,


  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    RestaurantsRoutingModule,
    MatPaginatorModule,
    FormsModule,
    CarouselModule,
    MatDialogModule,


  ]
})
export class RestaurantsModule { }
