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
import {BonPlanService} from '../../../services/bon-plan.service';

@Component({
  selector: 'app-bonplan-list',
  templateUrl: './bonplan-list.component.html',
  styleUrls: ['./bonplan-list.component.scss']
})
export class BonplanListComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private moyenPaiementService: MoyenPaiementService,
              private typeCuisineService: TypeCuisineService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private bonplanService:BonPlanService,
              private evenementService: EvenementsService,
              public dialog: MatDialog,
              private ActivateRoute:ActivatedRoute) { }
  restaurantList$: Observable<any>;
  typeCuisineList$: Observable<CuisineType>;
  restaurantsLength: number;
  public restaurantId : any;
  restaurantslist: any = [];
  public pageSlice = [];
  public toRestaurant=false;
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


    this.bonplanService.getAll().subscribe((res :any)=>{
      this.restaurantslist=res;
      this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
      this.restaurantsLength = res.length;
      this.isLoading = false;
    });

    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.restaurantId=params.id;
        if (params.id)
          this.evenementService.getAll().subscribe((res :any)=>{
            this.restaurantslist=res;
            this.restaurantslist = this.restaurantslist.filter((item)=>item.idRestaurant.idRestaurant==params.id)
            this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
            this.toRestaurant=true;
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
    this.bonplanService.deleteBonplan(this.id).subscribe((res: any) => {
        dialogRef.close();
      },
      error=> dialogRef.close());
  }
  openDialog(id: any) {
    this.id = id;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer ce bon plan?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.bonplanService.getAll().subscribe((res :any)=>{
        this.restaurantslist=res;
        this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
        this.restaurantsLength = res.length;
        this.isLoading = false;
      });

    });
  }



  navigateToModify(id, restaurantId){
    this.router.navigate([`restaurants/bonplans-modify`], { queryParams: { id: id, restaurantId: restaurantId } });
  }

  ajouter(){
    this.router.navigate([`restaurants/bonplans-add/`], );
  }
  navigateToModifyRestaurant() {
    this.router.navigate([`restaurants/modify/`], { queryParams: { id: this.restaurantId } });
  }


}
