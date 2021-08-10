import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../../../services/restaurants.service';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {CuisineType} from '../../../interfaces/cuisineType.model';
import {ExigenceAlimentaire} from '../../../interfaces/exigenceAlimentaire';
import {PageEvent} from '@angular/material/paginator';
import {ModalComponent} from '../../../components/modal/modal.component';
import {AmbianceService} from '../../../services/ambiance.service';

@Component({
  selector: 'app-cadres-ambiances-list',
  templateUrl: './cadres-ambiances-list.component.html',
  styleUrls: ['./cadres-ambiances-list.component.scss']
})
export class CadresAmbiancesListComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private moyenPaiementService: MoyenPaiementService,
              private typeCuisineService: TypeCuisineService,
              private ambianceService: AmbianceService,
              private router: Router,
              public dialog: MatDialog,
              private ActivateRoute: ActivatedRoute) { }
  restaurantList$: Observable<any>;
  typeCuisineList$: Observable<CuisineType>;
  restaurantsLength: number;
  restaurantslist: any = [];
  public pageSlice = [];
  public selectedCuisineType = '';
  public selectedExigenceAlimentaire = '';
  public exigenceAlimentaireList$: Observable<ExigenceAlimentaire>;
  private id: string;
  selectedNote = '-1';
  pageSize = 10;
  isLoading = true;
  restaurantName: string;
  fullRestaurantList: any = [];
  ngOnInit(): void {


    this.ambianceService.getAll().subscribe((res: any) => {
      this.restaurantslist = res;
      this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
      this.restaurantsLength = res.length;
      this.isLoading = false;
    });

  }


  onPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.restaurantslist.length) {
      endIndex = this.restaurantslist.length;
    }
    this.pageSlice = this.restaurantslist.slice(startIndex, endIndex);

  }
  roleFunction = (dialogRef: MatDialogRef<any>) => {
    this.ambianceService.deleteCadreAmbiance(this.id).subscribe((res: any) => {
        dialogRef.close();
      },
      error => dialogRef.close());
  }
  openDialog(id: any) {
    this.id = id;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer ce cadre ambiance?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;

        this.ambianceService.getAll().subscribe((res: any) => {
          this.restaurantslist = res;
          this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
          this.restaurantsLength = res.length;
          this.isLoading = false;

        }, error => {
          this.restaurantslist = error;
          this.restaurantslist = error;
          this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
          this.restaurantsLength = error.length;
          this.isLoading = false;

        });



    });
  }



  navigateToRestaurant(id, libelle) {
    this.router.navigate([`restaurants/cadre-ambiances-modify`], { queryParams: { id: id, Libelle: libelle } });
  }

  ajouter() {
    this.router.navigate([`restaurants/cadre-ambiances-add/`], );
  }

}
