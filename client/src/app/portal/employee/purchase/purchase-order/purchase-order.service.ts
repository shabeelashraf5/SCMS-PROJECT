import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../../../model/invoice.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private apiUrl = environment.apiUrl + '/api/portal/purchase';

  constructor(private http: HttpClient) { }

  getPo() {
    return this.http.get<any>(`${this.apiUrl}/purchase-order`);
  }


  poSingle(id: string){
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<any>(`${this.apiUrl}/purchase-order/${id}`, {headers});
}



}
