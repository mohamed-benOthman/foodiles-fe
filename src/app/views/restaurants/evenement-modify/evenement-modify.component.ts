import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {ImageService} from '../../../services/image.service';
import {EvenementsService} from '../../../services/evenements.service';
import {RestaurantsService} from '../../../services/restaurants.service';
import {filter, last} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-evenement-modify',
  templateUrl: './evenement-modify.component.html',
  styleUrls: ['./evenement-modify.component.scss']
})
export class EvenementModifyComponent implements OnInit {
  public isLoading = true;
  public success = false;
  public titre: string = '';
  public details: string = '';
  public path: string = '';
  public safePath :any;
  public dateDebut: any;
  public timeFin: any;
  public dateFin: any;
  public restaurant: any;
  private idEvents: any;
  public timeDebut: any;
  public restaurantDetails: any;
  public restaurantList$: Observable<any>;
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService,
    private imageService: ImageService,
    private evenementService: EvenementsService,
    private restaurantSerice: RestaurantsService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.restaurantList$ =  this.restaurantSerice.getAllRestaurants();
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.idEvents = params.id;
      this.evenementService.getAll().subscribe((res: any) => {
        this.restaurantDetails = res.filter((item) => item.idEvents == this.idEvents)[0];

        this.titre = this.restaurantDetails.titre;
        this.path = this.restaurantDetails.path;
        this.dateDebut = this.restaurantDetails.dateDebut.split(' ')[0];
        this.dateFin = this.restaurantDetails.dateFin.split(' ')[0];
        this.timeDebut = this.restaurantDetails.dateDebut.split(' ')[1];
        this.timeFin = this.restaurantDetails.dateFin.split(' ')[1];
        this.details = this.restaurantDetails.details;
        this.restaurant = this.restaurantDetails.idRestaurant;
        this.convertImage();
        this.isLoading = false;

      });

      }
    );
  }
  navigateBack() {
    this.router.navigate([`restaurants/evenement-list/`]);
  }
  addExigence() {
    const dateDebut = this.dateDebut + ' ' + this.timeDebut;
    const dateFin = this.dateFin + ' ' + this.timeFin;
    this.isLoading = true;
    this.evenementService.modifyEvent(this.titre, this.path, this.details, dateFin, dateFin, this.restaurant.idRestaurant, this.idEvents).subscribe((res: any) => {
      this.success = true;
      this.isLoading = false;
     /* setTimeout(() => this.navigateBack(), 1200);*/
    }, error => {
      this.success = true;
      this.isLoading = false;
      setTimeout(() => this.navigateBack(), 1200);
    });
  }
  uploadFile(event) {
    this.isLoading = true;
    console.log((event.target as HTMLInputElement).files[0]);
    console.log(event);
    console.log(event.total);
    /*console.log((event.loaded / event.total) * 100);*/

    this.imageService.uploadImageGeneral((event.target as HTMLInputElement).files[0] ).pipe(last()).subscribe((res: any) => {
        this.isLoading = true;
        if (res.type === HttpEventType.UploadProgress) {
        } else {
          this.path = res;
          this.convertImage();
          this.isLoading = false;
          console.log(this.path);
          window.alert('L\'image est ajouté avec succées');

        }
      },
      error => {
        this.path = error.error.text;
        this.convertImage();
        this.isLoading = false;
        window.alert('L\'image est ajouté avec succées');
      }     );                                                                                                                                                 ``;
  }
  convertImage(){
    console.log(this.path);
    this.imageService.getImageSrcGeneral(this.path).subscribe(
      (res: any) => {
        this.safePath = this.sanitizer.bypassSecurityTrustUrl(res);
      }
    );
  }
  deletePhoto(){
    this.path='';
  }
}
