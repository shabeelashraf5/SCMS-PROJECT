import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = environment.apiUrl + '/api/portal/purchase';

  constructor(private http: HttpClient) { }

  getSupplier() {
    return this.http.get<any>(`${this.apiUrl}/supplier`);
  }
}
