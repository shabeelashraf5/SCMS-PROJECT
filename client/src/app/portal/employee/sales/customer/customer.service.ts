import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.apiUrl + '/api/portal/sales';

  constructor(private http: HttpClient) { }

  getClient() {
    return this.http.get<any>(`${this.apiUrl}/customer`);
  }

}
