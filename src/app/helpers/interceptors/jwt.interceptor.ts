import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router:Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {

      if (request.url != environment.notificationEndpoint) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      }
    }
    if (this.router.url==='/login')
      return next.handle(request)
    else
    return next.handle(request).pipe(
      catchError((err:any)=>{
      if(err instanceof HttpErrorResponse)
        if (err.status===401)
        this.authService.logout();
        return of(err)
      })
    );
  }
}
