import { Injectable } from '@angular/core';
import { AddPo } from '../../../../model/purchase-addpo.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPoService {

  private apiUrl = 'http://localhost:3000/api/purchase';

  constructor(private http: HttpClient) { }


  
  addPo(datas: AddPo): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/purchase-order/form-add`, datas);

  }


  updatePo(id: string, data: AddPo): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/purchase-order/form-update/${id}`, data);
  }



  getPoBypurchaePOId(poId: string): Observable<AddPo> {
    return this.http.get<AddPo>(`${this.apiUrl}/purchase-order/form-add/${poId}`);
  }


}
