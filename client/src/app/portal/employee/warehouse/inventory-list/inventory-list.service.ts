import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../../../../model/ad-product.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryListService {

  private apiUrl =  environment.apiUrl + '/api/portal/warehouse';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<Products[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Products[]>(`${this.apiUrl}/inventory-list`, { headers });
  }
  
}
