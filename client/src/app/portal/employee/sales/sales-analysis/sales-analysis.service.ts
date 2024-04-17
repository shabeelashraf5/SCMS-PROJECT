import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class SalesAnalysisService {

  private apiUrl = environment.apiUrl + '/api/portal/sales';
  
    constructor(private http: HttpClient) { }
  
    getSPO() {
      return this.http.get<any>(`${this.apiUrl}/sales-analysis`);
    }

}
