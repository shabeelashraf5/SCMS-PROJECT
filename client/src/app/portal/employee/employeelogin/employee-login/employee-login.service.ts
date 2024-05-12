import { Injectable } from '@angular/core';
import { Observable, of, throwError  } from 'rxjs';
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
        localStorage.setItem(this.loggedInEmployeeKey, JSON.stringify(response.employee)); // Store logged-in employee info in local storage
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        console.log('Token stored in localStorage:', response.token);
        console.log('Refresh Token stored in localStorage:', response.refreshToken);
        console.log('Logged-in Employee:', this.loggedInEmployee);
      })
    );
}


/*
logout(employeeId: string): void {

  this.http.put(`${this.apiUrl}/logout`, { employeeId }).subscribe(
    () => console.log('User status updated to offline'),
    error => console.error('Error updating user status:', error)
  );

  localStorage.removeItem(this.tokenKey);
  console.log('User logged out');
} */

logout(employeeId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/logout`, { employeeId }).pipe(
    tap(() => {
      localStorage.removeItem(this.tokenKey);
      console.log('User logged out');
    })
  );
}




getToken(): string | null {

  return localStorage.getItem(this.tokenKey);
  
} 

getRefreshToken(): string | null {
  // Retrieve the refresh token from local storage or any other storage mechanism
  return localStorage.getItem(this.refreshTokenKey);
}




/*
getToken(): { accessToken: string | null, refreshToken: string | null } {
  const accessToken = localStorage.getItem(this.tokenKey);
  const refreshToken = localStorage.getItem(this.refreshTokenKey);
  return { accessToken, refreshToken };
} */

getLoggedInEmployeeId(): string | null {
  return this.loggedInEmployee ? this.loggedInEmployee._id : null;
}

/*
refreshToken(): Observable<string> {
  const refreshToken = localStorage.getItem(this.refreshTokenKey);
  return this.http.post<{ token: string }>(`${this.apiUrl}/refresh-tokens`, { refreshToken } )
    .pipe(
      map(response => {
        const token = response.token;
        console.log('Refreshed Token:', token);
        return token;
      })
    );
} */

/*
refreshToken(): Observable<string> {
  const refreshToken = localStorage.getItem(this.refreshTokenKey);
  if (!refreshToken) {
    return throwError('No refresh token available');
  }

  return this.http.post<{ token: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
    .pipe(
      map(response => {
        const newToken = response.token;
        localStorage.setItem(this.tokenKey, newToken);
        return newToken;
      }),
      catchError(error => {
        // Handle refresh token failure here
        return throwError('Failed to refresh token');
      })
    );
} */


refreshToken(): Observable<{ token: string }> {

  const refreshToken = localStorage.getItem(this.refreshTokenKey);
  if (!refreshToken) {
    return throwError('No refresh token available');
  }

  console.log('Refresh token available:', refreshToken); 
  
  return this.http.post<{ token: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
    .pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token); // Update access token in local storage
        console.log('Result:', response.token)
      })
    );
}




}
