import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../../../services/image.service';
import {ActivatedRoute} from '@angular/router';
import {RestaurantsService} from '../../../services/restaurants.service';
import {filter, last} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from '../../../components/modal/modal.component';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-image-restaurant',
  templateUrl: './image-restaurant.component.html',
  styleUrls: ['./image-restaurant.component.scss']
})
export class ImageRestaurantComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,
              private  imageService: ImageService,
              private activatedRoute: ActivatedRoute,
              private restaurantService: RestaurantsService,
              public dialog: MatDialog) { }

  public restaurantDetails$: Observable<any>;
  public restaurantDetails: any;
  imageUrl$: Observable<string>;
  imageUrl: any;
  isLoading = true;
  photoIdSelected: string;
  public  uploadPourcentage = 0;
  public restoId ;

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {

        console.log(params.id);
        this.restoId=params.id;
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
   roleFunction = (dialogRef: MatDialogRef<any>) => {
    this.restaurantService.deleteImage(this.restaurantDetails.idRestaurant, this.photoIdSelected).subscribe((res: any) => {
      dialogRef.close();
    });
  }
  openDialog(photoId: string) {
    this.photoIdSelected = photoId;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        text: 'Voulez vous supprimer cette photo?',
        roleFunction: this.roleFunction,
        buttonText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.isLoading = true;
      this.restaurantDetails$  = this.restaurantService.getRestaurantById(this.restaurantDetails.idRestaurant);
      this.restaurantDetails$.subscribe(async (res) => {
        this.restaurantDetails = res;
        this.getImage();
        this.isLoading = false;
    });

    });
  }
  uploadFile(event) {
    console.log((event.target as HTMLInputElement).files[0]);
    console.log(event);
    console.log(event.total);
    /*console.log((event.loaded / event.total) * 100);*/

    this.imageService.uploadImage((event.target as HTMLInputElement).files[0],this.restoId ).pipe(last()).subscribe((res: any) => {
      this.isLoading=true;
        if (res.type === HttpEventType.UploadProgress) {
          this.uploadPourcentage = Math.round(res.loaded / res.total * 100);
        } else {
          this.restaurantDetails$  = this.restaurantService.getRestaurantById(this.restoId);
          this.restaurantDetails$.subscribe(async (res) => {
            this.restaurantDetails = res;
            this.getImage();
            this.isLoading = false;
            window.alert("L'image est ajouté avec succées")
          });
        }
      },
      error => {
      this.isLoading=false;
       console.log(error);
        this.uploadPourcentage = 0;
      }     );                                                                                                                                                 ``;
  }


}
