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
import {EvenementsService} from '../../../services/evenements.service';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss']
})
export class EvenementListComponent implements OnInit {
  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private moyenPaiementService: MoyenPaiementService,
              private typeCuisineService: TypeCuisineService,
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
  pageSize = 5;
  isLoading = true;
  restaurantName: string;
  fullRestaurantList: any = [];
  ngOnInit(): void {


    this.evenementService.getAll().subscribe((res :any)=>{
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
    this.evenementService.deleteEvent(this.id).subscribe((res: any) => {
        dialogRef.close();
      },
      error=> dialogRef.close());
  }
  openDialog(id: any) {
    this.id = id;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer ce Evenement?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.evenementService.getAll().subscribe((res :any)=>{
        this.restaurantslist=res;
        this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
        this.restaurantsLength = res.length;
        this.isLoading = false;
      });

    });
  }



  navigateToModify(id){
    this.router.navigate([`restaurants/evenement-modify`], { queryParams: { id: id } });
  }

  ajouter(){
    this.router.navigate([`restaurants/evenement-add/`], );
  }



}
