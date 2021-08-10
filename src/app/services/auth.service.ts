import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.apiUrl + 'user/';
  error=false;
  authEndPoint = environment.apiUrl + 'auth-admin/';
  constructor(private router: Router, private http: HttpClient) {  }

  login(cred) {
    this.error=false;
    return this.http.post(this.authEndPoint + 'login', cred).pipe(map((user: any) => {
      window.localStorage.setItem('token', user.token);
      window.localStorage.setItem('email', user.email);
      this.router.navigateByUrl('dashboard');
    }),
      catchError((err => {
        this.error=true;
        return of(err)
      })));
   }
   logout() {
     window.localStorage.clear();
     setTimeout(()=>{
       this.router.navigate(['login']);
     },600 )

   }

   isLoggedIn() {
    if (window.localStorage.getItem('token') && window.localStorage.getItem('token').length>10 )
      return true;
    else
      return false;
   }
   getUsers() {
    return this.http.get(this.endpoint);

   }
}
