import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from './message.service';
import { Employee } from '../../model/ad-employee.model';
import io from 'socket.io-client';
import { Chat } from '../../model/chat.model';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../../service/toaster.service';
import { environment } from '../../../environment/environment';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit,  AfterViewChecked {

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  employeeProfile!: any
  selectedContact: any;
  socket: any;
  sender_id: any;
  receiver_id: any
  message: string = '';
  selectedUser: any; 
  chatMessages: Chat[] = [];
  chat: any
  receiverChat: Chat[] = [];
  mergedMessages: Chat[] = [];
  sender: any
  receiver: string = ''
  onlineUsers: any[] = [];
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
      /*
      if (message.receiver_id === loggedInEmployeeId) {
        
        this.toastr.success('New message received', 'New Message');
        this.showToastr = true; // Set to true to display the Toastr notification
        setTimeout(() => {
          this.showToastr = false; // Hide the Toastr notification after a certain period
        }, 5000); // Adjust the time as per your preference
      } */
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
    // Emit event to request existing chats
    this.socket.emit('existsChat', {
      sender_id: this.authService.getLoggedInEmployeeId()
    });
  }
  

  loadProfile() {
    this.employeeService.getProfile().subscribe(
      (response) => {
        this.employeeProfile = response; 
        console.log(this.employeeProfile);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  openChat(user: any) {
    this.selectedUser = user;

    // Mark message as 'Seen' when chat is opened
    this.employeeService.markMessageAsSeen(user._id).subscribe(
      (response) => {
        console.log('Message marked as Seen:', response);
      },
      (error) => {
        console.error('Error marking message as Seen:', error);
      }
    );

    this.chatMessages = [];
    this.receiverChat = [];
    this.requestExistingChat(user._id); 
  } 


 


  createChat(receiverId: string) {

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
      isRead: 'Delivered'
      
    };

    console.log(newChat)

    this.employeeService.addChat(newChat).subscribe(
      (response) => {

        //this.chat = response.data.message
       // this.chatMessages.push(response.data);
        console.log(response);
        this.receiver_id = response.data.receiver_id
        console.log(this.receiver_id );
        this.socket.emit('chatMessage', response.data);
        this.message = '';

        // this.loadOldChats(senderId, receiverId);
      },
      (error) => {
        console.error(error);
     
      }
    );
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


  isOnline(): boolean {
    return this.onlineUsers.includes(this.sender_id);
  }
  




}
