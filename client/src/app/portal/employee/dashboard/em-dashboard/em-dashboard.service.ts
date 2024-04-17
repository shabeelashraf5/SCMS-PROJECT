import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Messaging } from '../../../../model/em-messaging.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmDashboardService {

  private apiUrl = environment.apiUrl + '/api/portal';    

  constructor(private http: HttpClient) { }

  getMessage(): Observable<Messaging[]> {
     const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Messaging[]>(`${this.apiUrl}/dashboard`,{headers} );
  }


  addMessage(message: Messaging): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/dashboard/add`, message);
  }


  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/dashboard/delete/${messageId}`);
  }
}
