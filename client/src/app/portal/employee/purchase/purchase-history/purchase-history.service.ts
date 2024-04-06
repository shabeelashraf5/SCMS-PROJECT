import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../../../model/invoice.model';


@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  private apiUrl = 'http://localhost:3000/api/purchase';
  
    constructor(private http: HttpClient) { }
  
    getpurchase() {
      return this.http.get<any>(`${this.apiUrl}/purchase-history`);
    }

    addInv(newInv: Invoice): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/purchase-order/confirm`, newInv);
    }

}
