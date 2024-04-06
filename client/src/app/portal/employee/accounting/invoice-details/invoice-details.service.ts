import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../../../../model/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  private apiUrl = 'http://localhost:3000/api/accounting';
  
    constructor(private http: HttpClient) { }

  addShip(newShip: Shipment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invoicing/confirm`, newShip);
  }

}
