import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, concatMap } from 'rxjs';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmAuthInterceptor implements HttpInterceptor {

  constructor(private authService: EmployeeLoginService) {}

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
        
        console.error('HTTP error occurred:', error);
       
        return throwError(error);
      })
    );
  }
*/

/*

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Check if the request URL contains 'employee-login'
  if (request.url.includes('portal')) {
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
 */


intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Check if the request URL contains 'employee-login'
  if (request.url.includes('portal')) {
    const token = this.authService.getToken();
  const refreshToken = this.authService.getRefreshToken();

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
      if (error.status === 401) { // Unauthorized error
        // Attempt to refresh token
        return this.authService.refreshToken().pipe(
          switchMap(newToken => {
            // Retry the original request with the new token
            const authRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next.handle(authRequest);
          }),
          catchError((refreshError: HttpErrorResponse) => {
            console.error('Refresh token failed:', refreshError);
            // Handle refresh token failure here, e.g., redirect to login page
            // For now, rethrow the original error
            return throwError(error);
          })
        );
      }
      
      console.error('HTTP error occurred:', error);
      return throwError(error);
    })
  );
}


/*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request URL contains 'employee-login'
    if (request.url.includes('portal')) {
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
  }*/



}





 

