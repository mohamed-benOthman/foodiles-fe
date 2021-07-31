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
import { RestaurantModifyComponent } from './restaurant-modify/restaurant-modify.component';
import { ExigenceAlimentaireComponent } from './exigence-alimentaire/exigence-alimentaire.component';
import { ExigenceAlimentaireAddComponent } from './exigence-alimentaire-add/exigence-alimentaire-add.component';
import { ExigenceAlimentaireModifyComponent } from './exigence-alimentaire-modify/exigence-alimentaire-modify.component';
import { MoyensPaiementComponent } from './moyens-paiement/moyens-paiement.component';
import { MoyensPaiementAddComponent } from './moyens-paiement-add/moyens-paiement-add.component';
import { MoyensPaiementModifyComponent } from './moyens-paiement-modify/moyens-paiement-modify.component';
import { GuideMichelinComponent } from './guide-michelin/guide-michelin.component';
import { GuideMichelinAddComponent } from './guide-michelin-add/guide-michelin-add.component';
import { GuideMichelinModifyComponent } from './guide-michelin-modify/guide-michelin-modify.component';
import { MenuComponent } from './menu/menu.component';
import { MenuViewComponent } from './menu-view/menu-view.component';
import { MenuUpdateComponent } from './menu-update/menu-update.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import { SousMenuComponent } from './sous-menu/sous-menu.component';
import { SousMenuItemsComponent } from './sous-menu-items/sous-menu-items.component';
import { SousMenuItemsModifyComponent } from './sous-menu-items-modify/sous-menu-items-modify.component';
import { SousMenuItemsAddComponent } from './sous-menu-items-add/sous-menu-items-add.component';
import { EvenementListComponent } from './evenement-list/evenement-list.component';
import { EvenementAddComponent } from './evenement-add/evenement-add.component';
import { EvenementModifyComponent } from './evenement-modify/evenement-modify.component';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';


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
    RestaurantModifyComponent,
    ExigenceAlimentaireComponent,
    ExigenceAlimentaireAddComponent,
    ExigenceAlimentaireModifyComponent,
    MoyensPaiementComponent,
    MoyensPaiementAddComponent,
    MoyensPaiementModifyComponent,
    GuideMichelinComponent,
    GuideMichelinAddComponent,
    GuideMichelinModifyComponent,
    MenuComponent,
    MenuViewComponent,
    MenuUpdateComponent,
    SousMenuComponent,
    SousMenuItemsComponent,
    SousMenuItemsModifyComponent,
    SousMenuItemsAddComponent,
    EvenementListComponent,
    EvenementAddComponent,
    EvenementModifyComponent,
    RestaurantAddComponent,


  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    RestaurantsRoutingModule,
    MatPaginatorModule,
    FormsModule,
    CarouselModule,
    MatDialogModule,
    NgxJsonViewerModule,



  ]
})
export class RestaurantsModule { }
