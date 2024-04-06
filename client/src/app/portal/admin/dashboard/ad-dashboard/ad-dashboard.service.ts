import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdDashboardService {

  private apiUrl = 'http://localhost:3000/api/admin';
  
  constructor(private http: HttpClient) { }

  getSPO() {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }

}
