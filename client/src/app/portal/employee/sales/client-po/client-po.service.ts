import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientPo } from '../../../../model/client-po.model';

@Injectable({
  providedIn: 'root'
})
export class ClientPoService {

  private apiUrl = 'http://localhost:3000/api/sales';

  constructor(private http: HttpClient) { }


  
  addClientPo(datas: ClientPo): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/sales-order/form-add`, datas);

  }


  updateClientPo(id: string, data: ClientPo): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/sales-order/form-update/${id}`, data);
  }



  getClientPoByquotationId(quoatationId: string): Observable<ClientPo> {
    return this.http.get<ClientPo>(`${this.apiUrl}/sales-order/form-add/${quoatationId}`);
  }

}
