import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SalesAnalysisService {

  private apiUrl = 'http://localhost:3000/api/sales';
  
    constructor(private http: HttpClient) { }
  
    getSPO() {
      return this.http.get<any>(`${this.apiUrl}/sales-analysis`);
    }

}
