import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentaireService} from '../../../services/commentaire.service';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent implements OnInit {
  public isLoading = true;
  public data :any;
  public id;
  public restaurantDetails$: Observable<any>;
  public restaurantDetails:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private restaurantService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.restaurantDetails$  = this.restaurantService.getRestaurantById(params.id);
        this.restaurantDetails$.subscribe(async (res) => {
          this.restaurantDetails = res;
          this.id= params.id;
          this.data=JSON.parse(this.restaurantDetails.menu);
          this.isLoading = false;
        });
      }
    );
  }

  goBack(){
    this.router.navigate([`restaurants/menu/`], );

  }


}
