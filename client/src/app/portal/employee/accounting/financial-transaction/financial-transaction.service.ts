import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService {

  private apiUrl = environment.apiUrl + '/api/portal/accounting';

  constructor(private http: HttpClient) { }

  getTrans() {
    return this.http.get<any>(`${this.apiUrl}/financial-transaction`);
  }


  transSingle(id: string){
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<any>(`${this.apiUrl}/financial-transaction/${id}`, {headers});
}

}
