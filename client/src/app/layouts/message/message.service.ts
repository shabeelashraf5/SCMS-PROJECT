import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../model/ad-employee.model';
import io from 'socket.io-client';
import { Chat } from '../../model/chat.model';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private socket: any;
  private currentUser: any;

  private apiUrl = 'http://localhost:3000/api';

  constructor( private http: HttpClient , private authService: EmployeeLoginService) { 
    this.socket = io('http://localhost:3000');
    this.currentUser = authService.getToken;

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


  getChat(): Observable<Chat> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Chat>(`${this.apiUrl}/messages/:senderId/:receiverId`, { headers });
  } 



}
