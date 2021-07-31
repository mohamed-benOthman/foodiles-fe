import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentaireService} from '../../../services/commentaire.service';
import {ExigenceAlimentaireService} from '../../../services/exigence-alimentaire.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-exigence-alimentaire-modify',
  templateUrl: './exigence-alimentaire-modify.component.html',
  styleUrls: ['./exigence-alimentaire-modify.component.scss']
})
export class ExigenceAlimentaireModifyComponent implements OnInit {
  exigenceId:any;
  Libelle:any;
  public isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private exigenceService: ExigenceAlimentaireService
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
    console.log(this.exigenceId);
    this.exigenceService.modifyExigence(this.exigenceId,libelle).subscribe((res:any)=>{
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    }, error => {
      this.isLoading=false;
      setTimeout(()=>this.navigateBack(),1200)
    })
  }

  navigateBack(){
    this.router.navigate([`restaurants/exigences-alimentaires/`]);
  }
}
