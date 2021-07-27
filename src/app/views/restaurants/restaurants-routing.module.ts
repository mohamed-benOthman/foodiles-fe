import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ColorsComponent} from '../theme/colors.component';
import {TypographyComponent} from '../theme/typography.component';
import {ListeRestaurantsComponent} from './liste-restaurants/liste-restaurants.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import {ImagesManagementComponent} from './images-management/images-management.component';
import {ImageRestaurantComponent} from './image-restaurant/image-restaurant.component';
import {CommentairesComponent} from './commentaires/commentaires.component';
import {CommentairesRestaurantManagementComponent} from './commentaires-restaurant-management/commentaires-restaurant-management.component';
import {ModifyCommentaireComponent} from './commentairesRestaurantManagement/modify-commentaire/modify-commentaire.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Restaurants'
    },
    children: [
      {
        path: '',
        redirectTo: 'Liste des restaurants'
      },
      {
        path: 'list',
        component: ListeRestaurantsComponent,
        data: {
          title: 'Liste des Restaurants'
        }
      },
      {
        path: 'details',
        component: RestaurantDetailComponent,
        data: {
          title: 'Les Détails du restaurant'
        }
      },
      {
        path: 'images',
        component: ImagesManagementComponent,
        data: {
          title: 'Gestion des Images'
        }
      },
      {
        path: 'image-restaurant',
        component: ImageRestaurantComponent,
        data: {
          title: 'Gestion des Images du restaurant'
        }
      },

      {
        path: 'commentaires',
        component: CommentairesComponent,
        data: {
          title: 'Gestion des commentaiers'
        }
      },
      {
        path: 'commentaires-restaurant',
        component: CommentairesRestaurantManagementComponent,
        data: {
          title: 'Gestion des commentaiers du restaurant'
        }
      },
      {
        path: 'commentaires-modify',
        component: ModifyCommentaireComponent,
        data: {
          title: 'Modifier un Commentaire'
        }
      },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
