import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../../model/ad-category.model';

@Injectable({
  providedIn: 'root'
})
export class AdCategoryService {

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
     const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Category[]>(`${this.apiUrl}/category`,{headers} );
  }


  addCategory(category: Category): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/category/add`, category);
  }

  updateCategory(category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/category/update/${category._id}`, category);
  }


  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/category/delete/${categoryId}`);
  }

}
