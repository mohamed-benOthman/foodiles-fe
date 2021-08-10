import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';

@Component({
  selector: 'app-exigence-alimentaire-add',
  templateUrl: './exigence-alimentaire-add.component.html',
  styleUrls: ['./exigence-alimentaire-add.component.scss']
})
export class ExigenceAlimentaireAddComponent implements OnInit {
  public isLoading = false;
  public libelle: string = '';
  constructor(
    private router:Router,
    private exigenceService: ExigenceAlimentaireService
  ) { }

  ngOnInit(): void {
  }
  navigateBack(){
    this.router.navigate([`restaurants/exigences-alimentaires/`]);
  }
  async addExigence() {
    this.isLoading=true;
    await this.exigenceService.addExigenceAlimentaire(this.libelle).toPromise();
    this.isLoading=false;
    setTimeout(()=>this.navigateBack(),1200)
/*    this.exigenceService.addExigenceAlimentaire(this.libelle).subscribe((res:any)=>{
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    },error => {
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    })*/
  }
}
