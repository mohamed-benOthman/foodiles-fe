import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {AmbianceService} from '../../../services/ambiance.service';
import {filter} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-users-modify',
  templateUrl: './users-modify.component.html',
  styleUrls: ['./users-modify.component.scss']
})
export class UsersModifyComponent implements OnInit {
  userId: any;
  public success = false;
  Libelle: any;
  public isAdmin;
  public user;
  public isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService,
    private ambianceService: AmbianceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.userId = params.id;
        this.isLoading = false;
        this.userService.getById(this.userId).subscribe(res => {
          this.user = res;
          this.user.pass ? this.isAdmin = 1 : this.isAdmin = 0;
        });

      }
    );
  }
  addRestaurant() {
    this.success = false;
    this.isLoading = true;
    const data = {
      Login: this.user.Login,
      idUser: this.userId,
      MailUser: this.user.MailUser,
      pseudo: this.user.pseudo,
      Longitude: this.user.Longitude,
      Latitude:this.user.Latitude,
      pass:this.user.password1

    };

    if (this.isAdmin==0) {
      const {pass , ...result}=data
      this.userService.ModifyUser(result).subscribe((res: any) => {
        this.success = true;
        this.isLoading=false;
        this.navigateBack();

      }, error => this.isLoading=false);
    }
    else
    {

      this.userService.ModifyUser(data).subscribe((res: any) => {
        this.success = true;
        this.isLoading=false;
        this.navigateBack();


      }, error => this.isLoading=false);
    }



  }

  navigateBack() {
    this.router.navigate([`users/users-list`]);
  }
  onItemChange(value){
    this.isAdmin=value;
  }



}
