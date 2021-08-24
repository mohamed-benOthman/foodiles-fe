import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {ImageService} from '../../../services/image.service';
import {EvenementsService} from '../../../services/evenements.service';
import {RestaurantsService} from '../../../services/restaurants.service';
import {filter, last} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {BonPlanService} from '../../../services/bon-plan.service';

@Component({
  selector: 'app-bonplan-modify',
  templateUrl: './bonplan-modify.component.html',
  styleUrls: ['./bonplan-modify.component.scss']
})
export class BonplanModifyComponent implements OnInit {
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
  public restaurantId;
  public restaurantDetails: any;
  public restaurantList$: Observable<any>;
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService,
    private imageService: ImageService,
    private evenementService: EvenementsService,
    private bonPlanService: BonPlanService,
    private restaurantSerice: RestaurantsService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.restaurantList$ =  this.restaurantSerice.getAllRestaurants();
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.idEvents = params.id;
        this.bonPlanService.getByid(params.id).subscribe((res: any) => {


          this.titre = res.titre;
          this.path = res.path;
          this.dateDebut = res.dateDebut;
          this.dateFin = res.dateFin;
          this.details = res.details;
          this.restaurant = params.restaurantId;
          this.convertImage();
          this.isLoading = false;
          console.log(this.dateFin);
          console.log(this.dateDebut);

        });

      }
    );
  }
  navigateBack() {
    this.router.navigate([`restaurants/bonplans-list/`]);
  }
  addExigence() {
    const dateDebut = this.dateDebut ;
    const dateFin = this.dateFin;
    this.isLoading = true;
    this.bonPlanService.modifyBonPlan(this.titre, this.path, this.details, dateDebut, dateFin, this.restaurant, this.idEvents).subscribe((res: any) => {
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
          this.path = res.error.text;;
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
