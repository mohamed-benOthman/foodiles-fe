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
import {RestaurantModifyComponent} from './restaurant-modify/restaurant-modify.component';
import {ExigenceAlimentaireComponent} from './exigence-alimentaire/exigence-alimentaire.component';
import {ExigenceAlimentaireAddComponent} from './exigence-alimentaire-add/exigence-alimentaire-add.component';
import {ExigenceAlimentaireModifyComponent} from './exigence-alimentaire-modify/exigence-alimentaire-modify.component';
import {MoyensPaiementComponent} from './moyens-paiement/moyens-paiement.component';
import {MoyensPaiementAddComponent} from './moyens-paiement-add/moyens-paiement-add.component';
import {MoyensPaiementModifyComponent} from './moyens-paiement-modify/moyens-paiement-modify.component';
import {GuideMichelinComponent} from './guide-michelin/guide-michelin.component';
import {GuideMichelinAddComponent} from './guide-michelin-add/guide-michelin-add.component';
import {GuideMichelinModifyComponent} from './guide-michelin-modify/guide-michelin-modify.component';
import {MenuComponent} from './menu/menu.component';
import {MenuViewComponent} from './menu-view/menu-view.component';
import {MenuUpdateComponent} from './menu-update/menu-update.component';
import {SousMenuComponent} from './sous-menu/sous-menu.component';
import {SousMenuItemsComponent} from './sous-menu-items/sous-menu-items.component';
import {SousMenuItemsAddComponent} from './sous-menu-items-add/sous-menu-items-add.component';
import {SousMenuItemsModifyComponent} from './sous-menu-items-modify/sous-menu-items-modify.component';
import {EvenementListComponent} from './evenement-list/evenement-list.component';
import {EvenementModifyComponent} from './evenement-modify/evenement-modify.component';
import {EvenementAddComponent} from './evenement-add/evenement-add.component';
import {RestaurantAddComponent} from './restaurant-add/restaurant-add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Restaurants'
    },

    children: [
      {
        path: '',
        redirectTo: 'list'
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
        path: 'modify',
        component: RestaurantModifyComponent,
        data: {
          title: 'Modifier un restaurant'
        }
      },
      {
        path: 'add',
        component: RestaurantAddComponent,
        data: {
          title: 'Ajouter un restaurant'
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

      {
        path: 'exigences-alimentaires',
        component: ExigenceAlimentaireComponent,
        data: {
          title: 'Exigences Alimentaires'
        }
      },
      {
        path: 'exigences-alimentaires-add',
        component: ExigenceAlimentaireAddComponent,
        data: {
          title: 'Ajouter une Exigences Alimentaires'
        }
      },
      {
        path: 'exigences-alimentaires-modify',
        component: ExigenceAlimentaireModifyComponent,
        data: {
          title: 'Modifier une Exigences Alimentaires'
        }
      },

      {
        path: 'paiement',
        component: MoyensPaiementComponent,
        data: {
          title: 'Les moyens de paiement'
        }
      },
      {
        path: 'paiement-add',
        component: MoyensPaiementAddComponent,
        data: {
          title: 'Ajouter un moyen de paiement'
        }
      },

      {
        path: 'paiement-modify',
        component: MoyensPaiementModifyComponent,
        data: {
          title: 'Modifier un moyen de paiement'
        }
      },
      {
        path: 'michelin',
        component: GuideMichelinComponent,
        data: {
          title: 'Liste des guides michelin'
        }
      },
      {
        path: 'michelin-add',
        component: GuideMichelinAddComponent,
        data: {
          title: 'Ajouter un guide michelin'
        }
      },
      {
        path: 'michelin-modify',
        component: GuideMichelinModifyComponent,
        data: {
          title: 'Modifier un guide michelin'
        }
      },
      {
        path: 'menu',
        component:MenuComponent ,
        data: {
          title: 'Gestion des menus'
        }
      },
      {
        path: 'menu-view',
        component:MenuViewComponent ,
        data: {
          title: 'Consultation du menu'
        }
      },
      {
        path: 'menu-update',
        component:MenuUpdateComponent ,
        data: {
          title: 'Modification du menu'
        }
      },
      {
        path: 'menu-sous-list',
        component:SousMenuComponent ,
        data: {
          title: 'Liste des sous menus'
        }
      },
      {
        path: 'menu-sous-items',
        component:SousMenuItemsComponent ,
        data: {
          title: 'Liste des sous menus items'
        }
      },
      {
        path: 'menu-sous-items-add',
        component:SousMenuItemsAddComponent ,
        data: {
          title: 'Ajouter un item du sous menu'
        }
      },
      {
        path: 'evenement-list',
        component:EvenementListComponent ,
        data: {
          title: 'Liste des evenement'
        }
      },
      {
        path: 'evenement-modify',
        component:EvenementModifyComponent ,
        data: {
          title: 'Modifier un evenement'
        }
      },
      {
        path: 'evenement-add',
        component:EvenementAddComponent ,
        data: {
          title: 'Ajouter un evenement'
        }
      },
      {
        path: 'menu-sous-items-modify',
        component:SousMenuItemsModifyComponent ,
        data: {
          title: 'Modifier un item du sous menu'
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
