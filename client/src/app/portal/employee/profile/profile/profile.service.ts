import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../../../model/emp-profile.model';
import { Employee } from '../../../../model/ad-employee.model';
import { environment } from '../../../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl + '/api/portal'

  private apiUrls = environment.apiUrl + '/api/admin';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Employee> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Employee>(`${this.apiUrl}/profile`, { headers });
  }


  updateEmployee(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrls}/employee/update/${id}`, formData);
  }


} 

