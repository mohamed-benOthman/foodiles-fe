import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';
import {filter} from 'rxjs/operators';
import {AmbianceService} from '../../../services/ambiance.service';

@Component({
  selector: 'app-cadres-ambiances-modify',
  templateUrl: './cadres-ambiances-modify.component.html',
  styleUrls: ['./cadres-ambiances-modify.component.scss']
})
export class CadresAmbiancesModifyComponent implements OnInit {

  exigenceId:any;
  public success=false;
  Libelle:any;
  public isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService,
    private ambianceService : AmbianceService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
        this.exigenceId = params.id;
        this.Libelle = params.Libelle;
        this.isLoading=false;
      }
    );
  }
  modifyCommentaire(id, libelle) {
    this.isLoading=true;
    this.ambianceService.modifyCadreAmbiance(this.exigenceId,libelle).subscribe((res:any)=>{
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    }, error => {
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    })
  }

  navigateBack(){
    this.router.navigate([`restaurants/cadre-ambiances-list/`]);
  }

}
