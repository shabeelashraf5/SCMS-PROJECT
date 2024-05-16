import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../model/ad-employee.model';
import { io, Socket } from 'socket.io-client';
import { Chat } from '../../model/chat.model';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';
import { environment } from '../../../environment/environment';

type CurrentUserType = string | null;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private socket: Socket;
  private currentUser: CurrentUserType = null;

  private apiUrl = environment.apiUrl  + '/api/portal';

  constructor( private http: HttpClient , private authService: EmployeeLoginService) { 
    this.socket = io(environment.apiUrl);

  }


  getProfile(): Observable<Employee> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Employee>(`${this.apiUrl}/messenger`, { headers });
  } 


 sendMessage(message: string, receiverId: string): void {
    this.socket.emit('chatMessage', { message, receiver_id: receiverId });
  }



  addChat(newChat: Chat): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-chat`, newChat);
  }



  markMessageAsSeen(senderId: string): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/mark-as-seen`, { sender_id: senderId });

  }



}
