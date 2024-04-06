import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminLoginService} from '../../portal/admin/adminlogin/admin-login/admin-login.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AdminLoginService) {}
/*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    console.log('Token from AuthInterceptor:', token);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) { 
         
          return this.authService.refreshToken().pipe(
            switchMap(newToken => {
             
              const authRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(authRequest);
            }),
            catchError((refreshError: HttpErrorResponse) => {
              console.error('Refresh token failed:', refreshError);
              
              return throwError(error);
            })
          );
        }
        
        console.error('HTTP error occurred:', error);
        return throwError(error);
      })
    );
  } */

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    console.log('Token from AuthInterceptor:', token);

    if (token) {
     
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
      
        console.error('HTTP error occurred:', error);
     
        return throwError(error);
      })
    );
  } 



}









