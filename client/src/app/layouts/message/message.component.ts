import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from './message.service';
import { Employee } from '../../model/ad-employee.model';
//import io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';
import { Chat } from '../../model/chat.model';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../../service/toaster.service';
import { environment } from '../../../environment/environment';
import { firstValueFrom } from 'rxjs';
import { OnlineStatus } from '../../enums/online-status.enum';
import { ChatStatus } from '../../enums/chat-status.enum';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit,  AfterViewChecked {

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  employeeProfile: Employee[] = []
  socket!: Socket;
  sender_id: string | null = null;
  receiver_id: string | null = null;
  message: string = '';
  selectedUser: Employee | null = null; 
  chatMessages: Chat[] = [];
  receiverChat: Chat[] = [];
  mergedMessages: Chat[] = [];
  showToastr: boolean = false;
  

  constructor(  private employeeService: MessageService, private authService:  EmployeeLoginService , private toastr: ToastrService  ) {}

  

 
  ngOnInit(): void {
    this.loadProfile();
    
    this.sender_id = this.authService.getLoggedInEmployeeId();
   


    console.log(this.sender_id);

    this.socket = io( environment.apiUrl + '/user-namespace', {

    auth:{
      token: this.authService.getLoggedInEmployeeId()
    }

           
    }); 

   
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });


    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    }); 
    

  
    this.socket.on('chatMessage', (message: Chat) => {
      const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
      if (!loggedInEmployeeId) {
        console.error('Logged-in employee ID not found');
        return;
      }
      

      if (message.sender_id === loggedInEmployeeId || message.receiver_id === loggedInEmployeeId) {
        this.chatMessages.push(message);
        


      }
    });

    this.socket.on('loadChats', (data: { chats: Chat[] }) => {
      console.log('Existing chats:', data.chats);
      this.chatMessages = data.chats;
    });



  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  
  loadExistingChats() {
   
    this.socket.emit('existsChat', {
      sender_id: this.authService.getLoggedInEmployeeId()
    });
  }
  


  async loadProfile() {
    try {
      const response = await firstValueFrom(this.employeeService.getProfile());
      if (Array.isArray(response)) {
        this.employeeProfile = response;
      } else {
        // If not an array, handle the error case
        console.error('Expected an array of Employee, but got:', response);
      }
    } catch (error) {
      console.error('Error fetching employee profile:', error);
    }
  }




async openChat(user: Employee) {
  this.selectedUser = user;

  try {
    // Mark message as 'Seen' when chat is opened
    const response = await firstValueFrom(
      this.employeeService.markMessageAsSeen(user._id)
    );
    console.log('Message marked as Seen:', response);

    // Clear chat arrays
    this.chatMessages = [];
    this.receiverChat = [];

    // Request existing chat data for the user
    this.requestExistingChat(user._id);
  } catch (error) {
    console.error('Error marking message as Seen:', error);
  }
}
 



  async createChat(receiverId: string) {
    const senderId = this.authService.getLoggedInEmployeeId();
    if (!senderId) {
      console.error('Sender ID is null');
      return;
    }

    const newChat: Chat = {
      _id: '', 
      sender_id: senderId,
      receiver_id: receiverId, 
      message: this.message,
      createdAt: new Date(),
      isRead: ChatStatus.DELIVERED,
    };

    console.log('Creating new chat:', newChat);

    try {
      const response = await firstValueFrom(this.employeeService.addChat(newChat));

      console.log('Chat created:', response);

      // Extract the receiver_id from the response and emit a socket event
      this.receiver_id = response.data.receiver_id;
      this.socket.emit('chatMessage', response.data);

      // Clear the message input
      this.message = '';

      // You can call additional functions here if needed
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  }


  requestExistingChat(receiverId: string) {
    const senderId = this.authService.getLoggedInEmployeeId();
    if (!senderId) {
        console.error('Sender ID is null');
        return;
    }
    console.log('Requesting existing chat with receiverId:', receiverId);
    // Emit event to request existing chat
    this.socket.emit('existsChat', {
        sender_id: senderId,
        receiver_id: receiverId
    });
}

  
  getImageUrl(imageFileName: string): string {
    return   environment.apiUrl + `/images/${imageFileName}`; 
  }

  trackByEmployee(index: number, employee: Employee): string {
    return employee._id;
  }

  trackByChat(index: number, chat: Chat): string {
    return chat._id;
  }


  getOnlineStatusClass(status: OnlineStatus): string {
    return `avatar ${status === OnlineStatus.ONLINE ? OnlineStatus.ONLINE : OnlineStatus.OFFLINE}`;
  }

  getEmployeeProfileClass(detail: Employee): string {
    return this.getOnlineStatusClass(detail.is_online === OnlineStatus.ONLINE ? OnlineStatus.ONLINE :  OnlineStatus.OFFLINE);
  }




}
