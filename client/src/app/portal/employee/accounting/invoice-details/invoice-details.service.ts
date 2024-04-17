import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../../../../model/shipment.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  private apiUrl = environment.apiUrl + '/api/portal/accounting';
  
    constructor(private http: HttpClient) { }

  addShip(newShip: Shipment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invoicing/confirm`, newShip);
  }

}
