import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Po } from '../../../../model/purchase-po.model';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  
    private apiUrl = 'http://localhost:3000/api/sales';
  
    constructor(private http: HttpClient) { }
  
    getSPO() {
      return this.http.get<any>(`${this.apiUrl}/sales-order`);
    }


    
  addPo(newPo: Po): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sales-order/confirm`, newPo);
  }


  clientPosingle(id: string){
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<any>(`${this.apiUrl}/sales-order/${id}`, {headers});

  }



  
  }

