import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sous-menu-items-add',
  templateUrl: './sous-menu-items-add.component.html',
  styleUrls: ['./sous-menu-items-add.component.scss']
})
export class SousMenuItemsAddComponent implements OnInit {


  public isLoading = true;
  public data: any;
  public id;
  public name='';
  public price;
  public cuisine_name='';
  public category_name='';
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
  goBack() {
    this.router.navigate([`restaurants/menu-sous-items/`], { queryParams: { id: this.id, sousMenu:this.sousMenuId, index:this.sousMenuIndex  } });
  }
  toUpdate(sousMenu) {
    this.router.navigate([`restaurants/menu-view/`], { queryParams: { id: this.id, sousMenu } });
  }
  toAdd() {
    this.router.navigate([`restaurants/menu-sous-items-add/`], { queryParams: { id: this.id, sousMenu:this.sousMenuId, index:this.sousMenuId  } });
  }
  addItem(){
    const id = Math.floor(Math.random()*900000) + 100000;
    this.isLoading=true;
        const element = {
          id : id.toString(),
          name: this.name,
          position: 1,
          price: this.price,
          cuisine_name: this.cuisine_name,
          category_name: this.category_name,
        }
/*    const filteredItems = this.items.filter((item)=>item.id != id);*/
    this.items.push(element);
    console.log(this.wholeJson);
    this.wholeJson.Menu[this.sousMenuIndex]["Menu-items"]= this.items;
    console.log(this.wholeJson);
    console.log(this.items);
    console.log(this.data);
    this.restaurantService.modifyMenu(this.id, this.wholeJson).subscribe((res:any)=>{
      window.alert("Sous cuisine item est ajouté")
      this.goBack();

    })
  }


}
