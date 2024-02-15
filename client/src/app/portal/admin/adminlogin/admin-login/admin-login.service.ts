import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../../../model/ad-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private apiUrl = 'http://localhost:3000/api/admin';

  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ admin: Admin; token: string }> {
    return this.http.post<{ admin: Admin; token: string }>(`${this.apiUrl}/portal`, { email, password });

}


}
