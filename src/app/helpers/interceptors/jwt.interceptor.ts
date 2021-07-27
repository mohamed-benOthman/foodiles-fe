import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
   /*   const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
      const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);

      console.log('token expiration date: ' + expirationDate);
      console.log('token isExpired: ' + isExpired);
      console.log('token decodedToken: ' + JSON.stringify(decodedToken));


      if (isExpired) {
        this.authService.logout();
      }
      else {
        request = request.clone({
          setHeaders: {
            authorization: `Token ${token}`
          }
        });
      }*/
      if (request.url != environment.notificationEndpoint) {
      request = request.clone({
        setHeaders: {
          authorization: `Token ${token}`
        }
      });
      }
    }

    return next.handle(request);
  }
}
