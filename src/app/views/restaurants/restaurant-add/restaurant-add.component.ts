import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {AmbianceService} from '../../../services/ambiance.service';
import {filter} from 'rxjs/operators';
import {TranchePrixService} from '../../../services/tranche-prix.service';
import {GuideMichelinService} from '../../../services/guide-michelin.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.scss']
})
export class RestaurantAddComponent implements OnInit {
  public isLoading = true;
  public success = false;
  public restaurantDetails$: Observable<any>;
  public restaurantDetails: any;
  private restaueantId: any;
  private restoId: Number;
  checkBoxId = 'check';
  checkBoxId2 = 'check2das';
  checkBoxId4 = 'check4sd';
  checkBoxId3 = 'check89';
  checkBoxId5 = 'checksdfsd89';

  public typeCuisineList$: Observable<any>;
  public ambiancesList$: Observable<any>;
  public guideMichelin$: Observable<any>;
  public exigenceAlimentaireList$: Observable<any>;
  public moyensPaiemenstList$: Observable<any>;

  public tranchePrixList$ :Observable<any>;
  restaurantList$: Observable<any>;
  public Nom='';
  public adresse='';
  public CodePostal='';
  public Note='';
  public Description='';
  public Telephone='';
  public Telephone2='';
  public Fax='';
  public Horaire='';
  public Adresse='';
  public  Mail='';
  public Site='';
  public Longitude='';
  public Latitude='';
  public tranchePrix='';
  public selection_foodiles=0;
  public types = [];
  public exigenceAlims = [];
  public cadreAmbiances = [];
  public guideMichelins= [];
  public moyenPaiements=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private exigenceAlimentaireService: ExigenceAlimentaireService ,
    private typeCuisineService: TypeCuisineService,
    private ambianceService: AmbianceService,
    private tranchPrixList: TranchePrixService,
    private guideMichemlinService: GuideMichelinService,
    private moyensPaiemensService : MoyenPaiementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
    this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
    this.ambiancesList$ = this.ambianceService.getAll();
    this.tranchePrixList$=this.tranchPrixList.getAll();
    this.guideMichelin$ = this.guideMichemlinService.getAllPaiement();
    this.moyensPaiemenstList$=this.moyensPaiemensService.getAllPaiement();
    this.isLoading=false;
  }

  checked(id, type) {
    let result;
    if (type == 1) {
      result = this.types.filter((item) => item.idType === id);
    } else if (type == 2) {
      result = this.exigenceAlims.filter((item) => item.idExigenceAlimentaire === id);
    } else if (type ==3) {
      result = this.cadreAmbiances.filter((item) => item.idCadreAmbiance === id);
    }
    else if (type==5){
      result = this.moyenPaiements.filter((item) => item.idMoyenPaiement === id);

    }
    else {
      result = this.guideMichelins.filter((item) => item.idGuideMichelin === id);

    }

    return result.length > 0 ? true : false;
  }

  selectTypeCuisine(item) {
    if (this.checked(item.idType, 1) === false) {
      this.types.push(item);
    } else {
      this.types = this.types.filter((element) => element.idType != item.idType);
    }
  }

  selectExigence(item) {
    if (this.checked(item.exigenceAlims, 2) === false) {
      this.exigenceAlims.push(item);
    } else  {
      this.exigenceAlims = this.exigenceAlims.filter((element) => element.idExigenceAlimentaire != item.idExigenceAlimentaire);
    }
  }

  selectAmbiance(item) {
    if (this.checked(item.cadreAmbiances, 3) === false) {
      this.cadreAmbiances.push(item);
    } else  {
      this.cadreAmbiances = this.cadreAmbiances.filter((element) => element.idCadreAmbiance != item.idCadreAmbiance);
    }
  }

  selectGuide(item) {
    if (this.checked(item.guideMichelins, 4) === false) {
      this.guideMichelins.push(item);
    } else  {
      this.guideMichelins = this.guideMichelins.filter((element) => element.idGuideMichelin != item.idGuideMichelin);
    }
  }

  selectPayment(item) {
    if (this.checked(item.moyenPaiements, 5) === false) {
      this.moyenPaiements.push(item);
    } else  {
      this.moyenPaiements = this.moyenPaiements.filter((element) => element.idMoyenPaiement != item.idMoyenPaiement);
    }
  }
  addRestaurant() {
    this.success = false;
    this.isLoading = true;
    const data = {
      Nom: this.Nom,
      Adresse: this.Adresse,
      CodePostal: this.CodePostal,
      Description: this.Description,
      Telephone: this.Telephone,
      Telephone2: this.Telephone2,
      Note:this.Note,
      Fax: this.Fax,
      Horaire: this.Horaire,
      Mail: this.Mail,
      Site: this.Site,
      types: this.types,
      Longitude: this.Longitude,
      Latitude:this.Latitude,
      tranchePrix:this.tranchePrix,
      selection_foodiles:this.selection_foodiles,
      guideMichelins:this.guideMichelins,
      exigenceAlims: this.exigenceAlims,
      cadreAmbiances:this.cadreAmbiances

    };
    console.log(data);
    this.restaurantService.createRestaurant(data).subscribe((res: any) => {
      this.success = true;
      this.isLoading=false;

    }, error => this.isLoading=false);
  }
  navigateBack() {
    this.router.navigate([`restaurants/list/`]);
  }
  visualiser() {
    this.router.navigate([`restaurants/details`], { queryParams: { id: this.restoId } });
  }
  getRestaurant(id) {
    this.restaurantList$ = this.restaurantService.getAllRestaurants();
    this.restaurantList$.subscribe((res: any) => {
      this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
      this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
      const restaurantList = res;
      this.restaurantDetails = restaurantList.filter((item) => item.idRestaurant.toString() === id.toString())[0];
      this.isLoading = false;
    });
  }

}
