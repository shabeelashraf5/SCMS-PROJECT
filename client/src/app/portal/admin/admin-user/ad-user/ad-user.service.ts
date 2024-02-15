import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../../../../model/ad-user.model'

@Injectable({
  providedIn: 'root'
})
export class AdUserService {

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }


  getAdmins(): Observable<Admin[]> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Admin[]>(`${this.apiUrl}/admin-user`, { headers });
  }


  addAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin-user/add`, admin);
  }

  updateAdmin(admin: Partial<Admin>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin-user/update/${admin._id}`, admin);
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin-user/delete/${id}`);
  }

}
