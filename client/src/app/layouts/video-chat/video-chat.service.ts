import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../model/ad-employee.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoChatService {

  private apiUrl = environment.apiUrl + '/api/portal';


  constructor(private http: HttpClient) { }

  getProfile(): Observable<Employee> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Employee>(`${this.apiUrl}/video-conference`, { headers });
  }

}
