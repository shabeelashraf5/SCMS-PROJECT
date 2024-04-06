import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmAuthInterceptor implements HttpInterceptor {

  constructor(private authService: EmployeeLoginService) {}

  
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
