import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../../../services/restaurants.service';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CuisineType} from '../../../interfaces/cuisineType.model';
import {ExigenceAlimentaire} from '../../../interfaces/exigenceAlimentaire';
import {PageEvent} from '@angular/material/paginator';
import {ModalComponent} from '../../../components/modal/modal.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-exigence-alimentaire',
  templateUrl: './exigence-alimentaire.component.html',
  styleUrls: ['./exigence-alimentaire.component.scss']
})
export class ExigenceAlimentaireComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private typeCuisineService: TypeCuisineService,
              private router:Router,
              public dialog: MatDialog,
              private ActivateRoute:ActivatedRoute) { }
  restaurantList$: Observable<any>;
  typeCuisineList$: Observable<CuisineType>;
  restaurantsLength: number;
  restaurantslist: any = [];
  public pageSlice = [];
  public selectedCuisineType = '';
  public selectedExigenceAlimentaire = '';
  public exigenceAlimentaireList$: Observable<ExigenceAlimentaire>;
  private id : string;
  selectedNote="-1";
  pageSize = 10;
  isLoading = true;
  restaurantName: string;
  fullRestaurantList: any = [];
  ngOnInit(): void {




      this.exigenceAlimentaireService.getAllExigenceAlimentaire().subscribe((res :any)=>{
        this.restaurantslist=res;
        this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
        this.restaurantsLength = res.length;
        this.isLoading = false;
      });

    };


  onPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.restaurantslist.length) {
      endIndex = this.restaurantslist.length;
    }
    this.pageSlice = this.restaurantslist.slice(startIndex, endIndex);

  }
  roleFunction = (dialogRef: MatDialogRef<any>) => {
    this.exigenceAlimentaireService.deleteExigence(this.id).subscribe((res: any) => {
        dialogRef.close();
      },
      error=> dialogRef.close());
  }
  openDialog(id: any) {
    this.id = id;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer cette Exigence Alimentaire?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.exigenceAlimentaireService.getAllExigenceAlimentaire().subscribe((res :any)=>{
        this.restaurantslist=res;
        this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
        this.restaurantsLength = res.length;
        this.isLoading = false;
      });

    });
  }



  navigateToRestaurant(id,libelle){
    this.router.navigate([`restaurants/exigences-alimentaires-modify`], { queryParams: { id: id, Libelle: libelle } });
  }

  ajouter(){
    this.router.navigate([`restaurants/exigences-alimentaires-add/`], );
  }


}
