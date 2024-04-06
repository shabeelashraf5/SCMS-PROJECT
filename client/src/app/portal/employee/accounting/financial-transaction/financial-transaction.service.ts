import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService {

  private apiUrl = 'http://localhost:3000/api/accounting';

  constructor(private http: HttpClient) { }

  getTrans() {
    return this.http.get<any>(`${this.apiUrl}/financial-transaction`);
  }


  transSingle(id: string){
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<any>(`${this.apiUrl}/financial-transaction/${id}`, {headers});
}

}
