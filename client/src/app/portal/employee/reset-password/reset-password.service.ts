import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../model/ad-employee.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = environment.apiUrl + '/api/portal';

  constructor(private http: HttpClient) { }

  resetPassword(token: string) {
    return this.http.get(`${this.apiUrl}/reset-password?token=${token}`);
  }

  resetSuccess(token: string, password: string) {
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const body = { password };
    return this.http.put(`${this.apiUrl}/reset-password`,  body, { headers });
  }
  

 

}


