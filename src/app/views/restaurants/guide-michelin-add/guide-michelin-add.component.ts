import { Component, OnInit } from '@angular/core';
import {GuideMichelinService} from '../../../services/guide-michelin.service';
import {Router, RouteReuseStrategy} from '@angular/router';

@Component({
  selector: 'app-guide-michelin-add',
  templateUrl: './guide-michelin-add.component.html',
  styleUrls: ['./guide-michelin-add.component.scss']
})
export class GuideMichelinAddComponent implements OnInit {
  public isLoading = false;
  public success = false;
  public libelle: string = '';

  constructor(
    private router: Router,
    private moyenPaiementService: GuideMichelinService
  ) {
  }

  ngOnInit(): void {
  }

  navigateBack() {
    this.router.navigate([`restaurants/michelin/`]);
  }

  async addExigence() {
    /* this.isLoading=true;
     this.moyenPaiementService.addPaiement(this.libelle).subscribe((res:any)=>{
       this.success=true;
       this.isLoading=false;
       setTimeout(()=>this.navigateBack(),1200)
     },error => {
       this.success=true;
       this.isLoading=false;
       setTimeout(()=>this.navigateBack(),1200)
     })
   }*/
    this.isLoading = true;
    await this.moyenPaiementService.addPaiement(this.libelle).toPromise()
    this.success = true;
    this.isLoading = false;
    setTimeout(() => this.navigateBack(), 1200)
  }
}
