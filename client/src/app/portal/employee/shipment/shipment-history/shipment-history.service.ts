import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentHistoryService {

  private apiUrl = 'http://localhost:3000/api/shipment';

  constructor(private http: HttpClient) { }

  getShip() {
    return this.http.get<any>(`${this.apiUrl}/shipment-history`);
  }

  updateShipmentStatus(shipmentId: string) {
    return this.http.put<any>(`${this.apiUrl}/${shipmentId}/update-status`, {});
  }

}
