import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../../../model/ad-employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoginService {

  private apiUrl = 'http://localhost:3000/api';
  

  
  constructor(private http: HttpClient ) {}

  login(email: string, password: string): Observable<{ employee: Employee; token: string }> {
    return this.http.post<{ employee: Employee; token: string }>(`${this.apiUrl}/dashboard`, { email, password });

}




}
