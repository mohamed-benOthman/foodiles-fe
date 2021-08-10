import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {AmbianceService} from '../../../services/ambiance.service';

@Component({
  selector: 'app-cadres-ambiances-add',
  templateUrl: './cadres-ambiances-add.component.html',
  styleUrls: ['./cadres-ambiances-add.component.scss']
})
export class CadresAmbiancesAddComponent implements OnInit {

  public isLoading = false;
  public success =false;
  public libelle: string = '';
  constructor(
    private router:Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService,
    private ambianceService: AmbianceService
  ) { }

  ngOnInit(): void {
  }
  navigateBack(){
    this.router.navigate([`restaurants/cadre-ambiances-list/`]);
  }
  addExigence() {
    this.isLoading=true;
    this.ambianceService.addCadreAmbiance(this.libelle).subscribe((res:any)=>{
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    },error => {
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    })
  }

}
