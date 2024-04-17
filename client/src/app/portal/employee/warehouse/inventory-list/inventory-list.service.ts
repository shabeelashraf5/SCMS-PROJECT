import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../../model/ad-product.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryListService {

  private apiUrl =  environment.apiUrl + '/api/portal/warehouse';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<Product[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Product[]>(`${this.apiUrl}/inventory-list`, { headers });
  }
  
}
