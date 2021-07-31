import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {last} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {ImageService} from '../../../services/image.service';
import {EvenementsService} from '../../../services/evenements.service';
import {RestaurantsService} from '../../../services/restaurants.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-evenement-add',
  templateUrl: './evenement-add.component.html',
  styleUrls: ['./evenement-add.component.scss']
})
export class EvenementAddComponent implements OnInit {

  public isLoading = true;
  public success = false;
  public titre: string = '';
  public details: string = '';
  public path: string = '';
  public dateDebut: any;
  public timeFin: any;
  public dateFin: any;
  public restaurant:any;
  public timeDebut: any;
  public restaurantList$: Observable<any>;
  constructor(
    private router: Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService,
    private imageService: ImageService,
    private evenementService: EvenementsService,
    private restaurantSerice : RestaurantsService,
  ) { }

   ngOnInit(): void {

    this.restaurantList$ =  this.restaurantSerice.getAllRestaurants();
    this.isLoading=false;
  }
  navigateBack() {
    this.router.navigate([`restaurants/evenement-list/`]);
  }
  addExigence() {
    const dateDebut = this.dateDebut + ' '+ this.timeDebut;
    const dateFin = this.dateFin + ' '+this.timeFin;
    this.isLoading=true;
    this.evenementService.addEvent(this.titre, this.path,this.details, dateFin, dateFin,this.restaurant).subscribe((res:any)=>{
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    },error => {
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    })
  }
  uploadFile(event) {
    this.isLoading=true;
    console.log((event.target as HTMLInputElement).files[0]);
    console.log(event);
    console.log(event.total);
    /*console.log((event.loaded / event.total) * 100);*/

    this.imageService.uploadImageGeneral((event.target as HTMLInputElement).files[0] ).pipe(last()).subscribe((res: any) => {
        this.isLoading=true;
        if (res.type === HttpEventType.UploadProgress) {
        } else {
          this.path=res;
          this.isLoading=false;
          console.log(this.path);
          window.alert("L'image est ajouté avec succées")

        }
      },
      error => {
        this.path=error.error.text;
        this.isLoading=false;
        window.alert("L'image est ajouté avec succées")
      }     );                                                                                                                                                 ``;
  }

}
