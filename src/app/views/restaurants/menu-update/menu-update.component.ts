import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu-update',
  templateUrl: './menu-update.component.html',
  styleUrls: ['./menu-update.component.scss']
})
export class MenuUpdateComponent implements OnInit {
  public isLoading = true;
  public data: any;
  public id;
  public libelle = '';
  public success=false;
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
          this.isLoading = false;
        });
      }
    );
  }
  goBack(){
    this.router.navigate([`restaurants/menu-sous-list/`], { queryParams: { id: this.id } });

  }
  addMenuType() {

    const id = Math.floor(Math.random()*90000) + 10000;
    const element = {
      id : id.toString(),
      name: this.libelle,
      position: '1',
      "Menu-items": []
    }
    if (this.data.Menu){
      this.data.Menu.push(element);
      console.log(this.data);
      this.restaurantService.modifyMenu(this.id, this.data).subscribe((res:any)=>{
        this.success=true;
      })
    }
    else {
      let menuList : any[] =[];
      menuList.push(element);
      const dataToSend={
        Menu : menuList
      }
      console.log(dataToSend);
      this.restaurantService.modifyMenu(this.id, dataToSend).subscribe((res:any)=>{
        this.success=true;
      })
    }


  }


}
