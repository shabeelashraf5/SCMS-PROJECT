import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdDashboardService {

  private apiUrl = environment.apiUrl + '/api/admin';
  
  constructor(private http: HttpClient) { }

  getSPO() {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }

}
