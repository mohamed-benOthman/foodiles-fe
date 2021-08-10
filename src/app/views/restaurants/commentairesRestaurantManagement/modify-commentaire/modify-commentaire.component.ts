import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CommentaireService} from '../../../../services/commentaire.service';

@Component({
  selector: 'app-modify-commentaire',
  templateUrl: './modify-commentaire.component.html',
  styleUrls: ['./modify-commentaire.component.scss']
})
export class ModifyCommentaireComponent implements OnInit {
  public commentaireDetails$: Observable<any>;
  public commentaireDetails: any;
  public isLoading=false;
  public isActive:boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private commentaireService: CommentaireService
  ) { }
  public restaurantId: string;
  ngOnInit(): void {

    this.activatedRoute.queryParams.pipe(
      filter(params => params.id)

    ).subscribe(params => {
      this.restaurantId = params.restaurantId;
       this.commentaireService.getCommentaireById(params.id).subscribe((res: any) => {
         this.commentaireDetails = res;
         this.isActive=this.commentaireDetails.isActive;
         this.isLoading= false;
       });

      }
    );
  }

  modifyCommentaire(id, title, comment, isActive) {
    this.commentaireService.modifyCommentaireById(id, title, comment, isActive).subscribe((res: any) => {
       this.navigateBack();
    });
  }

  navigateBack(){
    this.router.navigate([`restaurants/commentaires-restaurant/`], { queryParams: { id: this.restaurantId } });
  }


  changeActive(){
     if (this.isActive===false)
       this.isActive=true;
     else
       this.isActive=false;
  }

}
