import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ModalComponent} from '../../../components/modal/modal.component';

@Component({
  selector: 'app-commentaires-restaurant-management',
  templateUrl: './commentaires-restaurant-management.component.html',
  styleUrls: ['./commentaires-restaurant-management.component.scss']
})
export class CommentairesRestaurantManagementComponent implements OnInit {
  public restaurantDetails$: Observable<any>;
  public restaurantDetails: any;

  isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService,
    public dialog: MatDialog,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
       this.restaurantDetails$  = this.restaurantService.getRestaurantById(params.id);
        this.restaurantDetails$.subscribe(async (res) => {
          this.restaurantDetails = res;
          this.isLoading = false;
        });
      }
    );
  }

  roleFunction = (dialogRef: MatDialogRef<any>) => {
    this.restaurantService.deleteCommentaire(this.restaurantDetails.idRestaurant, this.commentaireSelected).subscribe((res: any) => {
      dialogRef.close();
    });
  }
   public commentaireSelected:string;
  openDialog(photoId: string) {
    this.commentaireSelected = photoId;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer ce commentaire?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.isLoading = true;
      this.restaurantDetails$  = this.restaurantService.getRestaurantById(this.restaurantDetails.idRestaurant);
      this.restaurantDetails$.subscribe(async (res) => {
        this.restaurantDetails = res;
        this.isLoading = false;
      });

    });
  }

  navigateToCommentaireModify(id){
    this.router.navigate([`restaurants/commentaires-modify/`], { queryParams: { id: id , restaurantId: this.restaurantDetails.idRestaurant} });
  }

}
