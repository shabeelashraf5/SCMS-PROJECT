import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, concatMap } from 'rxjs';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmAuthInterceptor implements HttpInterceptor {

  constructor(private authService: EmployeeLoginService) {}


intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
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
      if (error.status === 401) { 
        // Attempt to refresh token
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
}




}





 

