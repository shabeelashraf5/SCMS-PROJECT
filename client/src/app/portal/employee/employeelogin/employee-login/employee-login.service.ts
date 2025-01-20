import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../../../model/ad-employee.model';
import { tap , map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeLoginService {

  private apiUrl = environment.apiUrl + '/api/portal'
  private tokenKey = 'employee_jwt_token';
  private refreshTokenKey = 'employee_refresh_token';
  private loggedInEmployee: Employee | null = null;
  private loggedInEmployeeKey = 'logged_in_employee'

  private isUsers = new BehaviorSubject<{
    image: string | null;
  }>({
    image: this.getImageFromStorage(),
  });

  users$ = this.isUsers.asObservable();
  

  constructor(private http: HttpClient ) {
    const employeeData = localStorage.getItem(this.loggedInEmployeeKey);
    if (employeeData) {
      this.loggedInEmployee = JSON.parse(employeeData);
    }
  }


 
  login(email: string, password: string): Observable<{ employee: Employee; token: string; refreshToken: string }> {
  return this.http.post<{ employee: Employee; token: string; refreshToken: string }>(`${this.apiUrl}/dashboard`, { email, password })
    .pipe(
      tap(response => {
        this.loggedInEmployee = response.employee;
        localStorage.setItem(this.loggedInEmployeeKey, JSON.stringify(response.employee)); 
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('image', response.employee.image);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        console.log('Token stored in localStorage:', response.token);
        console.log('Refresh Token stored in localStorage:', response.refreshToken);
        console.log('Logged-in Employee:', this.loggedInEmployee);
        this.isUsers.next({
          image: response.employee.image,
        });
      })
    );
}




logout(employeeId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/logout`, { employeeId }).pipe(
    tap(() => {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem('image');
      console.log('User logged out');
    })
  );
}


  getImageFromStorage(): string | null {
  return localStorage.getItem('image');
}



getToken(): string | null {

  return localStorage.getItem(this.tokenKey);
  
} 

getRefreshToken(): string | null {
  
  return localStorage.getItem(this.refreshTokenKey);
}



getLoggedInEmployeeId(): string | null {
  return this.loggedInEmployee ? this.loggedInEmployee._id : null;
}



// refreshToken(): Observable<{ token: string }> {

//   const refreshToken = localStorage.getItem(this.refreshTokenKey);
//   if (!refreshToken) {
//     return throwError('No refresh token available');
//   }

//   console.log('Refresh token available:', refreshToken); 
  
//   return this.http.post<{ token: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
//     .pipe(
//       tap(response => {
//         localStorage.setItem(this.tokenKey, response.token); 
//         console.log('Result:', response.token)
//       })
//     );
// }




}
