import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Shipment } from '../../../../model/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentHistoryService {

  private apiUrl = environment.apiUrl + '/api/portal/shipment';

  constructor(private http: HttpClient) { }

  getShip() {
    return this.http.get<any>(`${this.apiUrl}/shipment-history`);
  }

  updateShipmentStatus(shipmentId: string) {
    return this.http.put<any>(`${this.apiUrl}/${shipmentId}/update-status`, {});
  }

}
