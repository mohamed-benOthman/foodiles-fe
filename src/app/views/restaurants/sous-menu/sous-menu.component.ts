import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';

@Component({
  selector: 'app-sous-menu',
  templateUrl: './sous-menu.component.html',
  styleUrls: ['./sous-menu.component.scss']
})
export class SousMenuComponent implements OnInit {

  public isLoading = true;
  public data: any;
  public id;
  public libelle = '';
  public success=false;
  public wholeJson ;
  public restaurantDetails$: Observable<any>;
  public restaurantDetails: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.restaurantDetails$  = this.restaurantService.getRestaurantById(params.id);
        this.restaurantDetails$.subscribe(async (res) => {
          this.restaurantDetails = res;
          this.id = params.id;
          this.data = JSON.parse(this.restaurantDetails.menu);
          this.wholeJson = JSON.parse(this.restaurantDetails.menu);
          this.data=this.data.Menu
          console.log(this.data);
          this.isLoading = false;
        });
      }
    );
  }

  deleteSousMenu(id) {
    const sousMenuList = this.data.filter(item=>
      item.id != id
    )
/*    this.data.Menu.push(element);*/

    this.wholeJson.Menu = sousMenuList;
    console.log(this.wholeJson);
    this.restaurantService.modifyMenu(this.id, this.wholeJson).subscribe((res:any)=>{
     window.location.reload();
    })
  }
  toModify() {
    this.router.navigate([`restaurants/menu-update/`], { queryParams: { id: this.id } });
  }
  goToSousList(){
    this.router.navigate([`restaurants/menu/`]);

  }
  toUpdate(sousMenu, index) {
    console.log(sousMenu)
    this.router.navigate([`restaurants/menu-sous-items/`], { queryParams: { id: this.id, sousMenu:sousMenu, index:index  } });
  }
}
