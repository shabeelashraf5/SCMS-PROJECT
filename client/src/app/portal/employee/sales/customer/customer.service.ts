import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:3000/api/sales';

  constructor(private http: HttpClient) { }

  getClient() {
    return this.http.get<any>(`${this.apiUrl}/customer`);
  }

}
