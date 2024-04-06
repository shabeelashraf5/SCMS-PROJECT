import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../model/ad-employee.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:3000/api';

  constructor( private http: HttpClient) { }

  /*
  loadMessages(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('load messages');
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent<any>('new message');
  }

  sendMessage(message: { username: string, text: string }) {
    this.socket.emit('new message', message);
  }
*/




}
