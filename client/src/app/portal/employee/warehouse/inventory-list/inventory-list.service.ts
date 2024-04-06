import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../../model/ad-product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryListService {

  private apiUrl = 'http://localhost:3000/api/warehouse';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<Product[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Product[]>(`${this.apiUrl}/inventory-list`, { headers });
  }
  
}
