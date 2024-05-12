import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap,map } from 'rxjs/operators';
import { Admin } from '../../../../model/ad-user.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private apiUrl =  environment.apiUrl + '/api/admin';
  private tokenKey = 'jwt_token';

  
  constructor(private http: HttpClient) {}
/*
  login(email: string, password: string): Observable<{ admin: Admin; token: string }> {
    return this.http.post<{ admin: Admin; token: string }>(`${this.apiUrl}/portal`, { email, password }); 

} */

login(email: string, password: string): Observable<{ admin: Admin; token: string }> {
  return this.http.post<{ admin: Admin; token: string }>(`${this.apiUrl}/portal`, { email, password })
    .pipe(
      tap(response => {
        // Store token in local storage upon successful login
        localStorage.setItem(this.tokenKey, response.token);
        console.log('Token stored in localStorage:', response.token);
      })
    );
}

logout(): void {
  // Clear token from local storage upon logout
  localStorage.removeItem(this.tokenKey);
  console.log('User logged out');
}

getToken(): string | null {
  // Retrieve token from local storage
  return localStorage.getItem(this.tokenKey);
}

/*
refreshToken(): Observable<string> {
  // Implement your logic to refresh the token here, for example:
  const refreshToken = 'your_refresh_token';

  // You can make an HTTP request to refresh the token
  return this.http.post<{ token: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
    .pipe(
      map(response => response.token)
    );
}*/


}
