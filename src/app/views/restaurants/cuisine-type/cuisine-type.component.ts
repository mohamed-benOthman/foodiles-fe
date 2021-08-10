import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../../../services/restaurants.service';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EvenementsService} from '../../../services/evenements.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {CuisineType} from '../../../interfaces/cuisineType.model';
import {ExigenceAlimentaire} from '../../../interfaces/exigenceAlimentaire';
import {filter} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {ModalComponent} from '../../../components/modal/modal.component';
import {CuisineTypesService} from '../../../services/cuisine-types.service';

@Component({
  selector: 'app-cuisine-type',
  templateUrl: './cuisine-type.component.html',
  styleUrls: ['./cuisine-type.component.scss']
})
export class CuisineTypeComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private moyenPaiementService: MoyenPaiementService,
              private typeCuisineService: TypeCuisineService,
              private activatedRoute: ActivatedRoute,
              private typesService : CuisineTypesService,
              private router:Router,
              private evenementService: EvenementsService,
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


    this.typesService.getAll().subscribe((res :any)=>{
      this.restaurantslist=res;
      this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
      this.restaurantsLength = res.length;
      this.isLoading = false;
    });

    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        if (params.id)
          this.typesService.getAll().subscribe((res :any)=>{
            this.restaurantslist=res;
            this.restaurantslist = this.restaurantslist.filter((item)=>item.idRestaurant.idRestaurant==params.id)
            this.pageSlice = this.restaurantslist.slice(0, this.pageSize);

            this.restaurantsLength = res.length;
            this.isLoading = false;
          });


      }
    );

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
    this.typesService.deleteType(this.id).subscribe((res: any) => {
        dialogRef.close();
      },
      error=> dialogRef.close());
  }
  openDialog(id: any) {
    this.id = id;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer ce type de cuisine?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.typesService.getAll().subscribe((res :any)=>{
        this.restaurantslist=res;
        this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
        this.restaurantsLength = res.length;
        this.isLoading = false;
      });

    });
  }



  navigateToModify(id){
    this.router.navigate([`restaurants/types-cuisines-modify`], { queryParams: { id: id } });
  }

  ajouter(){
    this.router.navigate([`restaurants/types-cuisines-add/`], );
  }



}
