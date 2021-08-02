import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../../../services/restaurants.service';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {TypeCuisineService} from '../../../services/type-cuisine.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CuisineType} from '../../../interfaces/cuisineType.model';
import {ExigenceAlimentaire} from '../../../interfaces/exigenceAlimentaire';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss']
})
export class CommentairesComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService,
              private exigenceAlimentaireService: ExigenceAlimentaireService ,
              private typeCuisineService: TypeCuisineService,
              private router:Router,
              private ActivateRoute:ActivatedRoute) { }
  restaurantList$: Observable<any>;
  typeCuisineList$: Observable<CuisineType>;
  restaurantsLength: number;
  restaurantslist: any = [];
  public pageSlice = [];
  public selectedCuisineType = '';
  public selectedExigenceAlimentaire = '';
  public exigenceAlimentaireList$: Observable<ExigenceAlimentaire>;
  selectedNote="-1";
  pageSize = 10;
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

  navigateToRestaurant(id){
    this.router.navigate([`restaurants/commentaires-restaurant/`], { queryParams: { id: id } });
  }

  filter(){
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
    this.selectedCuisineType = '';
    this.selectedExigenceAlimentaire = '';
    this.selectedNote = '-1';
  }


}
