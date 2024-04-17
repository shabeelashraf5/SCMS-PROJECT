import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../../../model/ad-employee.model';
import { tap , map } from 'rxjs/operators';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeeLoginService {

  private apiUrl = environment.apiUrl + '/api/portal'
  private tokenKey = 'employee_jwt_token';
  private loggedInEmployee: Employee | null = null;
  private loggedInEmployeeKey = 'logged_in_employee'
  

  
  constructor(private http: HttpClient ) {
    const employeeData = localStorage.getItem(this.loggedInEmployeeKey);
    if (employeeData) {
      this.loggedInEmployee = JSON.parse(employeeData);
    }
  }


 
  

/*
login(email: string, password: string): Observable<{ employee: Employee; token: string }> {
  return this.http.post<{ employee: Employee; token: string }>(`${this.apiUrl}/dashboard`, { email, password })
    .pipe(
      tap(response => {
        this.loggedInEmployee = response.employee;
        localStorage.setItem(this.tokenKey, response.token);
        console.log('Token stored in localStorage:', response.token);
        console.log('Logged-in Employee:', this.loggedInEmployee);
      })
    );
}*/


login(email: string, password: string): Observable<{ employee: Employee; token: string }> {
  return this.http.post<{ employee: Employee; token: string }>(`${this.apiUrl}/dashboard`, { email, password })
    .pipe(
      tap(response => {
        this.loggedInEmployee = response.employee;
        localStorage.setItem(this.loggedInEmployeeKey, JSON.stringify(response.employee)); // Store logged-in employee info in local storage
        localStorage.setItem(this.tokenKey, response.token);
        console.log('Token stored in localStorage:', response.token);
        console.log('Logged-in Employee:', this.loggedInEmployee);
      })
    );
}



logout(employeeId: string): void {

  
  this.http.put(`${this.apiUrl}/logout`, { employeeId }).subscribe(
    () => console.log('User status updated to offline'),
    error => console.error('Error updating user status:', error)
  );
    

  localStorage.removeItem(this.tokenKey);
  console.log('User logged out');
}

getToken(): string | null {

  return localStorage.getItem(this.tokenKey);
}


getLoggedInEmployeeId(): string | null {
  return this.loggedInEmployee ? this.loggedInEmployee._id : null;
}


refreshToken(): Observable<string> {
  // Implement your logic to refresh the token here, for example:
  const refreshToken = 'your_refresh_token';

  // You can make an HTTP request to refresh the token
  return this.http.post<{ token: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
    .pipe(
      map(response => {
        const token = response.token;
        console.log('Refreshed Token:', token); // Log the token to the console
        return token; // Return the token
      })
    );
}




}
