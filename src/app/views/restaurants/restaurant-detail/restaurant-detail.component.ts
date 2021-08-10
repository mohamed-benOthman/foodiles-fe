import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable, Subscription} from 'rxjs';
import {ImageService} from '../../../services/image.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  public restaurantDetails$: Observable<any>;
  public restaurantDetails: any;
  imageUrl$: Observable<string>;
  imageUrl: any;
  isLoading = true;
  public restoId : Number;

  constructor(private sanitizer: DomSanitizer,
              private  imageService: ImageService,
              private activatedRoute: ActivatedRoute,
              private restaurantService: RestaurantsService,
              private router:Router
              ) {

    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  myInterval: number | false = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;


  ngOnDestroy(): void {
    this.myInterval = 0;
    this.noWrapSlides = true;
    this.myInterval = false;
  }

  addSlide(): void {
    setTimeout( () => {
      const seed = Math.random().toString(36).slice(-6);
      this.slides.push({
        image: `https://picsum.photos/seed/${seed}/900/500`
      });
    }, 500);
  }



  ngOnInit(): void {
/*
    this.imageUrl$ = this.imageService.getImageSrc('uploads_foo/foodiles_55/photoUserResto/259_1452347135018');
*/

      this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {

      console.log(params.id);
        this.restoId = params.id;
        this.restaurantDetails$  = this.restaurantService.getRestaurantById(params.id);
        this.restaurantDetails$.subscribe(async (res) => {
          this.restaurantDetails = res;
          this.getImage();
          this.isLoading = false;
        });
      }
    );
  }

  getImage(): any {
    for (const image of this.restaurantDetails.photos) {
      this.imageService.getImageSrc(image.content).subscribe(
        (res: any) => {
          image.content = this.sanitizer.bypassSecurityTrustUrl(res);
        }
      );
    }
    for (const image of this.restaurantDetails.bonPlans) {
      this.imageService.getImageSrc(image.path).subscribe(
        (res: any) => {
          image.path = this.sanitizer.bypassSecurityTrustUrl(res);
        }
      );
    }


  }
  toModify() {
    this.router.navigate([`restaurants/modify/`], { queryParams: { id: this.restoId } });
  }
  goBack() {
    this.router.navigate([`restaurants/list/`], );
  }
}
