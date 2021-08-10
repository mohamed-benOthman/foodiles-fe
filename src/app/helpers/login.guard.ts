import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
   token= window.localStorage.getItem('token');
  constructor(private router: Router, private authService: AuthService) {

  }
  canActivate() {
    if (this.token && this.token.length>10) {
      return false;
    }
    else {
      return true;
    }
  }

}
