import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersModifyComponent } from './users-modify/users-modify.component';
import {UsersRoutingModule} from './users-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    UsersListComponent,
    UsersAddComponent,
    UsersModifyComponent
  ],
  imports: [
    CommonModule, UsersRoutingModule,     MatPaginatorModule,     MatDialogModule, FormsModule

  ]
})
export class UsersModule { }
