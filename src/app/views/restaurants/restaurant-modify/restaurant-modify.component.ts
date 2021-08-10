import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable} from 'rxjs';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {AmbianceService} from '../../../services/ambiance.service';
import {GuideMichelinService} from '../../../services/guide-michelin.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {TranchePrixService} from '../../../services/tranche-prix.service';

@Component({
  selector: 'app-restaurant-modify',
  templateUrl: './restaurant-modify.component.html',
  styleUrls: ['./restaurant-modify.component.scss']
})
export class RestaurantModifyComponent implements OnInit {
  public isLoading = true;
  public success= false;
  public restaurantDetails$: Observable<any>;
  public restaurantDetails: any;
  private restaueantId: any;
  private restoId: Number;
  checkBoxId = 'check';
  checkBoxId2 = 'check2das';
  checkBoxId4 = 'check4sd';
  checkBoxId3 = 'check89';
  checkBoxId5 = 'checksdfsd89';
  public isActive;
  public typeCuisineList$: Observable<any>;
  public ambiancesList$: Observable<any>;
  public exigenceAlimentaireList$: Observable<any>;
  public moyensPaiemenstList$ :Observable<any>;
  public tranchePrixList$ : Observable<any>;
  public guideMichelin$: Observable<any>;
  restaurantList$: Observable<any>;
  tranchePrix="";

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private exigenceAlimentaireService: ExigenceAlimentaireService ,
    private typeCuisineService: TypeCuisineService,
    private ambianceService: AmbianceService,
    private  guideMichelinService:GuideMichelinService,
    private paiementService:MoyenPaiementService,
    private tranchePrixService: TranchePrixService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.guideMichelin$ = this.guideMichelinService.getAllPaiement();
    this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
    this.moyensPaiemenstList$ = this.paiementService.getAllPaiement();
    this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
    this.ambiancesList$=this.ambianceService.getAll();
    this.tranchePrixList$= this.tranchePrixService.getAll();
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
      this.restaueantId = params.id;
      this.getRestaurant(this.restaueantId);
      this.restaurantService.getTranchePrix(this.restaueantId).subscribe((res:any)=>{
        console.log(res.idTranchePrix);
        this.tranchePrix=res.idTranchePrix;
        console.log(this.tranchePrix);
      })


      }
    );


  }

  checked(id, type) {
    let result;
    if (type == 1) {
    result = this.restaurantDetails.types.filter((item) => item.idType === id);
    }
    else if (type==2){
      result = this.restaurantDetails.exigenceAlims.filter((item) => item.idExigenceAlimentaire === id);
    }
    else if (type==3) {
      result = this.restaurantDetails.cadreAmbiances.filter((item) => item.idCadreAmbiance === id);
    }
    else if (type==5){
      result = this.restaurantDetails.moyenPaiements.filter((item) => item.idMoyenPaiement === id);

    }
    else {
      result = this.restaurantDetails.guideMichelins.filter((item) => item.idGuideMichelin === id);
    }


    return result.length > 0 ? true : false;
  }

  selectTypeCuisine(item) {
   if (this.checked(item.idType, 1) === false) {
      this.restaurantDetails.types.push(item);
   } else {
        this.restaurantDetails.types = this.restaurantDetails.types.filter((element) => element.idType != item.idType);
   }
  }

  selectExigence(item) {
    if (this.checked(item.exigenceAlims, 2) === false) {
      this.restaurantDetails.exigenceAlims.push(item);
    } else  {
      this.restaurantDetails.exigenceAlims = this.restaurantDetails.exigenceAlims.filter((element) => element.idExigenceAlimentaire != item.idExigenceAlimentaire);
    }
  }

  selectAmbiance(item) {
    if (this.checked(item.cadreAmbiances, 3) === false) {
      this.restaurantDetails.cadreAmbiances.push(item);
    } else  {
      this.restaurantDetails.cadreAmbiances = this.restaurantDetails.cadreAmbiances.filter((element) => element.idCadreAmbiance != item.idCadreAmbiance);
    }
  }

  onItemChange(value){
    this.restaurantDetails.selection_foodiles=value;
}

  selectGuide(item) {
    if (this.checked(item.guideMichelins, 4) === false) {
      this.restaurantDetails.guideMichelins.push(item);
    } else  {
      this.restaurantDetails.guideMichelins = this.restaurantDetails.guideMichelins.filter((element) => element.idGuideMichelin != item.idGuideMichelin);
    }
  }

  selectPayment(item) {
    if (this.checked(item.moyenPaiements, 5) === false) {
      this.restaurantDetails.moyenPaiements.push(item);
    } else  {
      this.restaurantDetails.moyenPaiements = this.restaurantDetails.moyenPaiements.filter((element) => element.idMoyenPaiement != item.idMoyenPaiement);
    }
  }
  modifyRestaurant() {
    this.success= false;
    this.isLoading=true;
    const data = {
      idRestaurant:this.restaurantDetails.idRestaurant,
      Nom: this.restaurantDetails.Nom,
      Adresse: this.restaurantDetails.Adresse,
      CodePostal: this.restaurantDetails.CodePostal,
      Description: this.restaurantDetails.Description,
      Telephone: this.restaurantDetails.Telephone,
      Telephone2: this.restaurantDetails.Telephone2,
      Fax: this.restaurantDetails.Fax,
      Horaire: this.restaurantDetails.Horaire,
      Mail: this.restaurantDetails.Mail,
      Site: this.restaurantDetails.Site,
      types: this.restaurantDetails.types,
      exigenceAlims: this.restaurantDetails.exigenceAlims,
      cadreAmbiances: this.restaurantDetails.cadreAmbiances,
      guideMichelins: this.restaurantDetails.guideMichelins,
      selection_foodiles: this.restaurantDetails.selection_foodiles,
      Longitude: this.restaurantDetails.Longitude,
      Latitude: this.restaurantDetails.Latitude,
      moyenPaiements:this.restaurantDetails.moyenPaiements,
      tranchePrix: this.tranchePrix,
      isActive: this.isActive,

    };
    console.log(data);
    this.restaurantService.modifyRestaurant(data).subscribe((res: any) => {
        this.getRestaurant(this.restaueantId);
        this.success=true;

    });
  }

  changeisActive(){
    if (this.isActive)
      this.isActive=false;
    else
      this.isActive=true;
  }
  navigateBack() {
    this.router.navigate([`restaurants/list/`]);
  }
  visualiser(page) {
    this.router.navigate([`restaurants/`+page], { queryParams: { id: this.restaueantId } });
  }
  getRestaurant(id) {
    this.restaurantList$ = this.restaurantService.getAllRestaurants();
    this.restaurantList$.subscribe((res: any) => {
      this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
      this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
      const restaurantList = res;
      this.restaurantDetails = restaurantList.filter((item) => item.idRestaurant.toString() === id.toString())[0];
      this.isActive= this.restaurantDetails.isActive;
      console.log(this.isActive)
      this.isLoading = false;
    });
  }

  goBack() {
    this.router.navigate([`restaurants/list/`], );
  }
}
