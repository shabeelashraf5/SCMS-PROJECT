import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../../../../model/ad-product.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdProductService {

  private apiUrl = environment.apiUrl + '/api/admin';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Products[]>(`${this.apiUrl}/product`, { headers });
  }

  addProduct(product: Products): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/add`, product);
  }

  updateProduct(product: Partial<Products>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/product/update/${product._id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/product/delete/${id}`);
  }

  

}
