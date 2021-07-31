import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  endpoint = environment.apiUrl + 'commentaire/';

  constructor(private httpClient: HttpClient) { }

  deleteCommentaire(idCommentaire: string) {
    const data = {
      id: idCommentaire
    };
    this.httpClient.post(this.endpoint + 'delete', data);
  }

  getCommentaireById(idCommentaire: string) {
    return this.httpClient.get(this.endpoint + idCommentaire);
  }

  getAll() {
    return this.httpClient.get(this.endpoint );
  }

  modifyCommentaireById(id: string, title: string, comment: string) {
    const data = {
      id,
      title,
      comment
    };
    return this.httpClient.post(this.endpoint + 'modify', data );
  }
}
