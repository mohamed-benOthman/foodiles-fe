
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersAddComponent} from './users-add/users-add.component';
import {UsersModifyComponent} from './users-modify/users-modify.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Les Utilisateurs'
    },
    children: [
      {
        path: '',
        redirectTo: 'users-list'
      },
      {
        path: 'users-list',
        component: UsersListComponent,
        data: {
          title: 'Liste des Utilisateurs'
        }
      },
      {
        path: 'users-add',
        component: UsersAddComponent,
        data: {
          title: 'Ajouter un Utilisateur'
        }
      },
      {
        path: 'users-modify',
        component: UsersModifyComponent,
        data: {
          title: 'Modifier un Utilisateur'
        }
      }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
