import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminLoginService} from '../../portal/admin/adminlogin/admin-login/admin-login.service';
import { catchError, switchMap } from 'rxjs/operators';
import { url } from 'inspector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AdminLoginService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('URL CONNECTED:', request.url)
    // Check if the request URL contains 'employee-login'
    if (request.url.includes('admin')) {
      const token = this.authService.getToken();

      console.log('Token from AuthInterceptor:', token);

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error occurred:', error);
        return throwError(error);
      })
    );
  }



}









