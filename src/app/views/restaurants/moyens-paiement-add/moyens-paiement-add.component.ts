import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {MoyenPaiementService} from '../../../services/moyen-paiement.service';

@Component({
  selector: 'app-moyens-paiement-add',
  templateUrl: './moyens-paiement-add.component.html',
  styleUrls: ['./moyens-paiement-add.component.scss']
})
export class MoyensPaiementAddComponent implements OnInit {
  public isLoading = false;
  public success =false;
  public libelle: string = '';
  constructor(
    private router:Router,
    private exigenceService: ExigenceAlimentaireService,
    private moyenPaiementService: MoyenPaiementService
  ) { }

  ngOnInit(): void {
  }
  navigateBack(){
    this.router.navigate([`restaurants/paiement/`]);
  }
  async addExigence() {
    this.isLoading=true;
    await this.moyenPaiementService.addPaiement(this.libelle).toPromise();
    this.success=true;
    this.isLoading=false;
    setTimeout(()=>this.navigateBack(),1200)
   /* this.moyenPaiementService.addPaiement(this.libelle).subscribe((res:any)=>{
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    },error => {
      this.success=true;
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    })*/
  }
}
