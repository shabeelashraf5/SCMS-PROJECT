import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as EmMessagingActions from '../em-dashboard/store/em-dashboard.action';
import { Messaging } from '../../../../model/em-messaging.model';
import { Observable, map } from 'rxjs';
import { Employee } from '../../../../model/ad-employee.model';
import { EmployeeLoginService } from '../../employeelogin/employee-login/employee-login.service';
import mongoose from 'mongoose';
import { environment } from '../../../../../environment/environment';



@Component({
  selector: 'app-em-dashboard',
  templateUrl: './em-dashboard.component.html',
  styleUrl: './em-dashboard.component.css'
})
export class EmDashboardComponent implements OnInit {

  _id: string = ''
  message: string = '';
  employee_id: string = '';
  date!: Date
  loggedInEmployeeId: string | undefined;

  canDelete: boolean = false; 


  employees: Employee[] = [];

  messages$: Observable<Messaging[]>; 

  constructor(private store: Store<AppState> , private authService: EmployeeLoginService) {
    this.messages$ = this.store.pipe(select(state => state.message.messages));
    
  }


  ngOnInit(): void {
    
    this.store.dispatch(EmMessagingActions.loadMessage());

  
  }


  onSubmit(): void {

    const message  = {

      message: this.message,
      employee_id: this.employee_id,
      date: this.date  
    };
     // Assuming this.category is a string
    console.log('Dispatching addCategory action with category:', message);
    this.store.dispatch(EmMessagingActions.addMessage( message )); 
    
    this.message = '';
   
}




deleteMessage(message: Messaging) {
  if (message && message._id) {
    const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
    const MessageEmployeeId = (message.employee_id as any)._id
    console.log('Logged-in Employee ID:', loggedInEmployeeId); 
    console.log('Message Employee ID:', MessageEmployeeId); 

    if (loggedInEmployeeId && MessageEmployeeId === loggedInEmployeeId) {
      
      this.store.dispatch(EmMessagingActions.deleteMessage({ messageId: message._id }));
      console.log(message._id);
    } else {
      console.log('You are not authorized to delete this message.');
    }
  } else {
    console.error('Message or its ID is undefined');
  }
}

confirmDelete(message: any) {
  if (confirm('Are you sure you want to delete?')) {
      this.deleteMessage(message);
  }
}



canDeleteMessage(message: Messaging): boolean {
  const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  const messageEmployeeId = (message.employee_id as any)._id

 
  return loggedInEmployeeId === messageEmployeeId;
}



getEmployee(employeeId: any): string {
  if (typeof employeeId === 'object') {
    return employeeId.fname + ' ' + employeeId.lname ;
  }
  return '';
}


getPosition(employeeId: any): string {
  if (typeof employeeId === 'object') {
    return employeeId.position ;
  }
  return '';
}



getImage(employeeId: any): string {
  if (typeof employeeId === 'object') {
    return employeeId.image ;
  }
  return '';
}



getImageUrl(imageFileName: string): string {
  return environment.apiUrl + `/images/${imageFileName}`; 
}




}
