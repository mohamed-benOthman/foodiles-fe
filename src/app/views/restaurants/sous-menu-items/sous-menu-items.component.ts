import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sous-menu-items',
  templateUrl: './sous-menu-items.component.html',
  styleUrls: ['./sous-menu-items.component.scss']
})
export class SousMenuItemsComponent implements OnInit {

  public isLoading = true;
  public data: any;
  public id;
  public sousMenuId;
  public sousMenuIndex;
  public libelle = '';
  public success=false;
  filteredData;
  public wholeJson;
  public items;
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
          this.sousMenuIndex=params.index;
          this.sousMenuId=params.sousMenu;
          console.log(this.sousMenuId);
          this.data = JSON.parse(this.restaurantDetails.menu);
          this.wholeJson= JSON.parse(this.restaurantDetails.menu);
          this.data=this.data.Menu;
          this.filteredData = this.data.filter((item)=> item.id === params.sousMenu)[0]
          this.items=this.filteredData["Menu-items"];
          console.log(this.data);
          this.isLoading = false;
        });
      }
    );
  }

  toUpdate(sousMenu) {
    this.router.navigate([`restaurants/menu-view/`], { queryParams: { id: this.id, sousMenu } });
  }
  goToSousList(){
    this.router.navigate([`restaurants/menu-sous-list/`], { queryParams: { id: this.id } });

  }
  toAdd() {
    this.router.navigate([`restaurants/menu-sous-items-add/`], { queryParams: { id: this.id, sousMenu:this.sousMenuId, index:this.sousMenuIndex  } });
  }
  toModify(itemId) {
    this.router.navigate([`restaurants/menu-sous-items-modify/`], { queryParams: { id: this.id, sousMenu:this.sousMenuId, index:this.sousMenuIndex, itemIndex : itemId  } });
  }

  deleteSousItem(id){
   this.isLoading=true;
/*    const element = {
      id : id.toString(),
      name: this.libelle,
      position: this.data.Menu.length,
      "Menu-items": []
    }*/
    const filteredItems = this.items.filter((item)=>item.id != id);
    this.wholeJson.Menu[this.sousMenuIndex]["Menu-items"]= filteredItems;
    console.log(this.wholeJson);
    console.log(filteredItems);
    console.log(this.data);
    this.restaurantService.modifyMenu(this.id, this.wholeJson).subscribe((res:any)=>{
      window.location.reload();
    })
  }
}
