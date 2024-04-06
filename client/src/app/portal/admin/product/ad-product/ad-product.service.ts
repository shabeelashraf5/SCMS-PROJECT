import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../../model/ad-product.model';

@Injectable({
  providedIn: 'root'
})
export class AdProductService {

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const headers = { 'Cache-Control': 'no-cache' };
    return this.http.get<Product[]>(`${this.apiUrl}/product`, { headers });
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/add`, product);
  }

  updateProduct(product: Partial<Product>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/product/update/${product._id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/product/delete/${id}`);
  }

}
