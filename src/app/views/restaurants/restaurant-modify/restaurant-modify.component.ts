import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable} from 'rxjs';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {AmbianceService} from '../../../services/ambiance.service';

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
  public typeCuisineList$: Observable<any>;
  public ambiancesList$: Observable<any>;
  public exigenceAlimentaireList$: Observable<any>;
  restaurantList$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private exigenceAlimentaireService: ExigenceAlimentaireService ,
    private typeCuisineService: TypeCuisineService,
    private ambianceService: AmbianceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
    this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
    this.ambiancesList$=this.ambianceService.getAll();
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
      this.restaueantId = params.id;
      /*this.restaurantList$ = this.restaurantService.getAllRestaurants();
      this.restaurantList$.subscribe((res: any) => {
        this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
        this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
        const restaurantList = res;
        this.restaurantDetails = restaurantList.filter((item) => item.idRestaurant.toString() === params.id.toString())[0];
        this.isLoading = false;
      });*/
      this.getRestaurant(this.restaueantId);

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
    else {
      result = this.restaurantDetails.a.filter((item) => item.cadreAmbiances === id);
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

    };
    this.restaurantService.modifyRestaurant(data).subscribe((res: any) => {
        this.getRestaurant(this.restaueantId);
        this.success=true;

    });
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
