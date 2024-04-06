import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quotation } from '../../../../model/sales-quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private apiUrl = 'http://localhost:3000/api/sales';

  constructor(private http: HttpClient) { }

  getRFQ() {
    return this.http.get<any>(`${this.apiUrl}/quotations`);
  }


  addRFQ(newRFQ: Quotation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quotations/add`, newRFQ);
  }


  qsingle(id: string){
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<any>(`${this.apiUrl}/quotations/${id}`, {headers});

  }


 


  

}
