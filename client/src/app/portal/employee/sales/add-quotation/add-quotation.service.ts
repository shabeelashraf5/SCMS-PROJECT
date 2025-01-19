import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddQuotation } from '../../../../model/sales-addquo';
import { environment } from '../../../../../environment/environment';
import { Products } from '../../../../model/ad-product.model';

@Injectable({
  providedIn: 'root'
})
export class AddQuotationService {

  private apiUrl = environment.apiUrl + '/api/portal/sales';

  constructor(private http: HttpClient) { }


  
  addQuotation(datas: AddQuotation): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/quotations/form-add`, datas);

  }


  updateQuotation(id: string, data: AddQuotation): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/quotations/form-update/${id}`, data);
  }



  getQuotationBySalesRFQId(salesRFQId: string): Observable<AddQuotation> {
    return this.http.get<AddQuotation>(`${this.apiUrl}/quotations/form-add/${salesRFQId}`);
  }

  searchProducts(query: string): Observable<Products[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Products[]>(`${this.apiUrl}/quatations/products?q=${query}`, { headers });
  }
  

}
