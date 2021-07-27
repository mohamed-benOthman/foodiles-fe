import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {  }

  login(cred){
    return this.http.post("http://82.165.253.223:3070/user/gettoken", cred).pipe(map((user:any) => {
      window.localStorage.setItem('token', user.user_f.code);
      this.router.navigateByUrl('restaurants/list')
    }));
   }
   logout(){
     window.localStorage.clear();
     this.router.navigate(['']);
   }
}
