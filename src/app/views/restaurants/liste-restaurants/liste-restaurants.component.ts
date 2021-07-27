import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RestaurantsService} from '../../../services/restaurants.service';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {CuisineType} from '../../../interfaces/cuisineType.model';
import {ExigenceAlimentaire} from '../../../interfaces/exigenceAlimentaire';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-liste-restaurants',
  templateUrl: './liste-restaurants.component.html',
  styleUrls: ['./liste-restaurants.component.scss']
})
export class ListeRestaurantsComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private typeCuisineService: TypeCuisineService,
              private router: Router,
              private ActivateRoute: ActivatedRoute) { }
  restaurantList$: Observable<any>;
  typeCuisineList$: Observable<CuisineType>;
  restaurantsLength: number;
  restaurantslist: any = [];
  public pageSlice = [];
  public selectedCuisineType = '';
  public selectedExigenceAlimentaire = '';
  public exigenceAlimentaireList$: Observable<ExigenceAlimentaire>;
  selectedNote = '-1';
  pageSize = 5;
  isLoading = true;
  restaurantName: string;
  fullRestaurantList: any = [];
  ngOnInit(): void {

    this.restaurantList$ = this.restaurantService.getAllRestaurants();
     this.restaurantList$.subscribe((res: any) => {
       this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
       this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
       this.restaurantslist = res;
        this.fullRestaurantList = res;
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


  search(searchBy) {
    searchBy = searchBy.toLocaleLowerCase();
    return this.restaurantslist.filter((exp) =>
      exp.Nom.toLocaleLowerCase().indexOf(searchBy) !== -1
    );

  }

  checkType(restaurantId) {

    const restaurant = this.restaurantslist.filter(item =>
    item.idRestaurant === restaurantId
    );
    const searched = restaurant[0].types.filter(item => item.Libelle === this.selectedCuisineType);
   if (searched.length > 0) {
     return  true;
   } else {
     return  false;
   }
  }

  checkExigences(restaurantId) {

    const restaurant = this.restaurantslist.filter(item =>
      item.idRestaurant === restaurantId
    );
    const searched = restaurant[0].exigenceAlims.filter(item => item.Libelle === this.selectedExigenceAlimentaire);
    if (searched.length > 0) {
      return  true;
    } else {
      return  false;
    }
  }
  filtrer() {
   if (this.selectedCuisineType.length > 0) {

     this.restaurantslist = this.restaurantslist.filter((restaurant) =>
          this.checkType(restaurant.idRestaurant) === true
     );
     this.restaurantsLength = this.restaurantslist.length;
     this.pageSlice = this.restaurantslist.slice(0, this.pageSize);

   }
    if (this.selectedExigenceAlimentaire.length > 0) {

      this.restaurantslist = this.restaurantslist.filter((restaurant) =>
        this.checkExigences(restaurant.idRestaurant) === true
      );
      this.restaurantsLength = this.restaurantslist.length;
      this.pageSlice = this.restaurantslist.slice(0, this.pageSize);

    }

    if (this.selectedNote != '-1') {
      console.log(this.selectedNote);
      this.restaurantslist = this.restaurantslist.filter((item) => item.Note.toString() === this.selectedNote);
      this.restaurantsLength = this.restaurantslist.length;
      this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
    }


  }

  navigateToRestaurant(id) {
    this.router.navigate([`restaurants/details/`], { queryParams: { id: id } });
  }

  filter() {
    const typeCuisine = this.selectedCuisineType.toLowerCase();
    const exigenceAlimentaire =  this.selectedExigenceAlimentaire.toLowerCase();
    const note = this.selectedNote;
/*    return this.restaurantslist.filter((item)=>{

    })*/
  }
  restaurantSearch() {
    console.log(this.restaurantName);
    this.restaurantslist = this.restaurantName
      ? this.search(this.restaurantName)
      : this.fullRestaurantList;
    this.restaurantsLength = this.restaurantslist.length;
    this.pageSlice = this.restaurantslist.slice(0, this.pageSize);

  }
  reset() {
    this.restaurantList$.subscribe((res: any) => {
      this.isLoading = false;
      this.typeCuisineList$ = this.typeCuisineService.getAllTypesOfCuisine();
      this.exigenceAlimentaireList$ = this.exigenceAlimentaireService.getAllExigenceAlimentaire();
      this.restaurantslist = res;
      this.fullRestaurantList = res;
      this.pageSlice = this.restaurantslist.slice(0, this.pageSize);
      this.restaurantsLength = res.length;
      this.isLoading = false;
    });
    this.selectedCuisineType = '';
    this.selectedExigenceAlimentaire = '';
    this.selectedNote = '-1';

  }

}
