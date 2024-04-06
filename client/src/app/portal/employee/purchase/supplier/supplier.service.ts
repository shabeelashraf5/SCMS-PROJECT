import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'http://localhost:3000/api/purchase';

  constructor(private http: HttpClient) { }

  getSupplier() {
    return this.http.get<any>(`${this.apiUrl}/supplier`);
  }
}
